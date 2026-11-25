import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getTiktokLinks, insertTiktokLink } from "@project8/domain/daos/titoLinksDAO";

import { authMiddleware } from "../middleware/auth.middleware";

const tiktokLinkCreateDtoSchema = z.object({
	url: z.string().trim().max(121).optional(),
	thumbnail: z.string().nullable().optional(),
	isRecipe: z.boolean().optional(),
	descriptionImage: z.string().nullable().optional(),
	tgSavedAt: z.string().max(22).nullable().optional(),
});

export const tiktokLinksRoutes = new Hono<{
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
				recipes: z
					.string()
					.transform((value) => value === "true")
					.optional(),
			})
		),
		async (c) => {
			try {
				const { recipes } = c.req.valid("query");
				const links = await getTiktokLinks(recipes ?? false);
				return c.json(links);
			} catch (error) {
				console.error("Failed to fetch TikTok links", error);
				return c.json({ error: "Failed to fetch TikTok links" }, 500);
			}
		}
	)
	.post("/", zValidator("json", tiktokLinkCreateDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");
			const inserted = await insertTiktokLink(body.url, body.thumbnail, body.isRecipe, body.descriptionImage, body.tgSavedAt);
			return c.json({ success: inserted }, 201);
		} catch (error) {
			console.error("Failed to create TikTok link", error);
			return c.json({ error: "Failed to create TikTok link" }, 500);
		}
	});
