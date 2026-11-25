import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getSectionById, getSectionsForProject, insertSection, updateSectionTitle } from "@project8/domain/daos/sectionsDAO";

import { authMiddleware } from "../middleware/auth.middleware";

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

export const sectionsRoutes = new Hono<{
	Variables: {
		user: {
			id: string;
		};
	};
}>()
	.use("*", authMiddleware)
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				projectId: z.coerce.number().int().min(1),
			})
		),
		async (c) => {
			try {
				const { projectId } = c.req.valid("query");

				const sections = await getSectionsForProject(projectId);
				return c.json(sections);
			} catch (error) {
				console.error("Failed to fetch sections", error);
				return c.json({ error: "Failed to fetch sections" }, 500);
			}
		}
	)
	.post(
		"/",
		zValidator(
			"json",
			z.object({
				title: z.string().trim().min(1, "Section title should not be empty").max(88),
				projectId: z.number().int().min(1),
			})
		),
		async (c) => {
			try {
				const body = c.req.valid("json");

				const createdSection = await insertSection(body.title, body.projectId);
				return c.json(createdSection, 201);
			} catch (error) {
				console.error("Failed to create section", error);
				return c.json({ error: "Failed to create section" }, 500);
			}
		}
	)
	.put(
		"/:id",
		zValidator("param", byIdParamsSchema),
		zValidator(
			"json",
			z.object({
				title: z.string().trim().min(1, "Section title should not be empty").max(88),
			})
		),
		async (c) => {
			try {
				const { id } = c.req.valid("param");
				const body = c.req.valid("json");

				const existingSection = await getSectionById(id);
				if (!existingSection) {
					return c.json({ error: "Section not found" }, 404);
				}

				// TODO validate user permissions to update the section

				const updatedSection = await updateSectionTitle(id, body.title);
				return c.json(updatedSection);
			} catch (error) {
				console.error("Failed to update section", error);
				return c.json({ error: "Failed to update section" }, 500);
			}
		}
	);
