import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getAllProjects, getBookmarkedProjects, insertProject, updateProject } from "@project8/domain/daos/projectsDAO";

import { authMiddleware } from "../middleware/auth.middleware";

const projectEditableDtoSchema = z.object({
	name: z.string().refine((value) => value.trim().length > 0, {
		message: "Project name should not be empty",
	}),
	bookmarked: z.boolean().optional(),
});

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

export const projectsRoutes = new Hono<{
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
				bookmarked: z
					.string()
					.transform((value) => value === "true")
					.optional(),
			})
		),
		async (c) => {
			const { bookmarked } = c.req.valid("query");

			const projects = bookmarked ? await getBookmarkedProjects() : await getAllProjects();

			return c.json(projects);
		}
	)
	.post("/", zValidator("json", projectEditableDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");
			const user = c.get("user");

			const createdProject = await insertProject(body.name, body.bookmarked ?? false, user.id);

			return c.json(createdProject, 201);
		} catch (error) {
			console.error("Failed to create project", error);
			return c.json({ error: "Failed to create project" }, 500);
		}
	})
	.put("/:id", zValidator("param", byIdParamsSchema), zValidator("json", projectEditableDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			// TODO: check if the user has permission to update the project
			const updatedProject = await updateProject(id, body.name, body.bookmarked ?? false);

			if (!updatedProject) {
				return c.json({ error: "Project not found" }, 404);
			}

			return c.json(updatedProject);
		} catch (error) {
			console.error("Failed to update project", error);
			return c.json({ error: "Failed to update project" }, 500);
		}
	});
