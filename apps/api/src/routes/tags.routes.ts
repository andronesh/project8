import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { deleteTag, getAllTagsAsTree, insertTag, searchTagsByName, updateTag } from "@project8/domain/daos/tagsDAO";

import { tagEditableDtoSchema } from "@project8/domain/types";

import { authMiddleware } from "../middleware/auth.middleware";

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

export const tagsRoutes = new Hono<{
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
				name: z.string().optional(),
			})
		),
		async (c) => {
			const { name } = c.req.valid("query");
			const sanitisedName = name?.trim() || "";

			const tags = sanitisedName ? await searchTagsByName(sanitisedName) : await getAllTagsAsTree();

			return c.json(tags);
		}
	)
	.post("/", zValidator("json", tagEditableDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");
			const user = c.get("user");

			const createdTag = await insertTag(body, user.id);

			return c.json(createdTag, 201);
		} catch (error) {
			console.error("Failed to create tag", error);
			return c.json({ error: "Failed to create tag" }, 500);
		}
	})
	.put("/:id", zValidator("param", byIdParamsSchema), zValidator("json", tagEditableDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			// TODO: check if the user has permission to update the tag
			const updatedTag = await updateTag(id, body);

			if (!updatedTag) {
				return c.json({ error: "Tag not found" }, 404);
			}

			return c.json(updatedTag);
		} catch (error) {
			console.error("Failed to update tag", error);
			return c.json({ error: "Failed to update tag" }, 500);
		}
	})
	.delete("/:id", zValidator("param", byIdParamsSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const user = c.get("user");

			await deleteTag(id, user.id);

			return c.json({});
		} catch (error) {
			console.error("Failed to delete tag", error);
			return c.json({ error: "Failed to delete tag" }, 500);
		}
	});
