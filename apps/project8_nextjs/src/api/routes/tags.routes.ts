import { deleteTag, getAllTagsAsTree, insertTag, searchTagsByName, updateTag } from "@/database/dao/tagsDAO";
import { tagEditableDtoSchema } from "@/types";
import { Elysia, t, status } from "elysia";
import { authPlugin } from "../plugins/auth.plugin";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
	.use(authPlugin)
	.get(
		"/",
		async ({ query: { name } }) => {
			const sanitisedName = name?.trim() || "";

			return sanitisedName ? await searchTagsByName(sanitisedName) : await getAllTagsAsTree();
		},
		{
			auth: true,
			query: t.Object({
				name: t.Optional(t.String()),
			}),
		}
	)
	.post(
		"/",
		async ({ body, user }) => {
			try {
				const createdTag = await insertTag(body, user.id);
				return status(201, createdTag);
			} catch (error) {
				console.error("Failed to create tag", error);
				return status(500, { error: "Failed to create tag" });
			}
		},
		{
			auth: true,
			body: tagEditableDtoSchema,
		}
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			try {
				const updatedTag = await updateTag(params.id, body);

				return updatedTag ? status(200, updatedTag) : status(404, { error: "Tag not found" });
			} catch (error) {
				console.error("Failed to update tag", error);
				return status(500, { error: "Failed to update tag" });
			}
		},
		{
			auth: true,
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
			body: tagEditableDtoSchema,
		}
	)
	.delete(
		"/:id",
		async ({ params, user }) => {
			try {
				await deleteTag(params.id, user.id);
				return status(200, {});
			} catch (error) {
				console.error("Failed to delete tag", error);
				return status(500, { error: "Failed to delete tag" });
			}
		},
		{
			auth: true,
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
		}
	);
