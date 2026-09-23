import { deleteLink, findLinksByUrl, getAllLinksPaginated, insertLink, updateLink } from "@project8/domain/daos/linksDAO";
import { linkEditableDtoSchema } from "@project8/domain/types";
import { Elysia, t, status } from "elysia";
import { authPlugin } from "../plugins/auth.plugin";

export const linksRoutes = new Elysia({ prefix: "/links" })
	.use(authPlugin)
	.get(
		"/",
		async ({ query: { url, limit, offset } }) => {
			return url?.trim() ? await findLinksByUrl(url.trim()) : await getAllLinksPaginated(limit, offset);
		},
		{
			auth: true,
			query: t.Object({
				url: t.Optional(t.String()),
				limit: t.Optional(t.Number({ minimum: 1 })),
				offset: t.Optional(t.Number()),
			}),
		}
	)
	.post(
		"/",
		async ({ body, user }) => {
			try {
				const createdLink = await insertLink(body, user.id);
				return status(201, createdLink);
			} catch (error) {
				console.error("Failed to create link", error);
				return status(500, { error: "Failed to create link" });
			}
		},
		{
			auth: true,
			body: linkEditableDtoSchema,
		}
	)
	.put(
		"/:id",
		async ({ params, body, user }) => {
			try {
				const updatedLink = await updateLink(params.id, body, user.id);
				return updatedLink ? status(200, updatedLink) : status(404, { error: "Link not found" });
			} catch (error) {
				console.error("Failed to update link", error);
				return status(500, { error: "Failed to update link" });
			}
		},
		{
			auth: true,
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
			body: linkEditableDtoSchema,
		}
	)
	.delete(
		"/:id",
		async ({ params, user }) => {
			try {
				await deleteLink(params.id, user.id);
				return status(200, {});
			} catch (error) {
				console.error("Failed to delete link", error);
				return status(500, { error: "Failed to delete link" });
			}
		},
		{
			auth: true,
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
		}
	);
