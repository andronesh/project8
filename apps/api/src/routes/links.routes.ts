import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { deleteLink, findLinksByUrl, getAllLinksPaginated, insertLink, updateLink } from "@project8/domain/daos/linksDAO";
import { linkEditableDtoSchema } from "@project8/domain/types";
import { authMiddleware } from "../middleware/auth.middleware";

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

export const linksRoutes = new Hono<{
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
				url: z.string().optional(),
				limit: z.coerce.number().int().min(1).optional(),
				offset: z.coerce.number().int().optional(),
			})
		),
		async (c) => {
			const { url, limit, offset } = c.req.valid("query");

			const result = url?.trim() ? await findLinksByUrl(url.trim()) : await getAllLinksPaginated(limit, offset);

			return c.json(result);
		}
	)
	.post("/", zValidator("json", linkEditableDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");
			const user = c.get("user");

			const createdLink = await insertLink(body, user.id);

			return c.json(createdLink, 201);
		} catch (error) {
			console.error("Failed to create link", error);
			return c.json({ error: "Failed to create link" }, 500);
		}
	})
	.put("/:id", zValidator("param", byIdParamsSchema), zValidator("json", linkEditableDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");
			const user = c.get("user");

			const updatedLink = await updateLink(id, body, user.id);

			if (!updatedLink) {
				return c.json({ error: "Link not found" }, 404);
			}

			return c.json(updatedLink);
		} catch (error) {
			console.error("Failed to update link", error);
			return c.json({ error: "Failed to update link" }, 500);
		}
	})
	.delete("/:id", zValidator("param", byIdParamsSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const user = c.get("user");

			await deleteLink(id, user.id);

			return c.json({});
		} catch (error) {
			console.error("Failed to delete link", error);
			return c.json({ error: "Failed to delete link" }, 500);
		}
	});
