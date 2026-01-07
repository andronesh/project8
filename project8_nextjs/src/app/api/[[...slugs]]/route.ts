import {
	getAllProjects,
	getBookmarkedProjects,
	insertProject,
	updateProject,
} from "@/database/dao/projectsDAO";
import { auth } from "@/utils/auth";
import { Elysia, t, status } from "elysia";
import { cors } from "@elysiajs/cors";
import { deleteTag, getAllTagsAsTree, insertTag, searchTagsByName, updateTag } from "@/database/dao/tagsDAO";
import { tagEditableDtoSchema } from "@/types";

const projectEditableDtoSchema = t.Object({
	name: t.String({ pattern: ".*\\S.*", message: "Project name should not be empty" }),
	bookmarked: t.Optional(t.Boolean()),
});

const allowedOriginsString = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsString.split(",");

const app = new Elysia({ prefix: "/api" })
	.use(
		cors({
			origin: ({ headers }) => {
				const originHeader = headers.get("origin");
				return originHeader !== null && allowedOrigins.includes(originHeader);
			},
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({ headers });
				if (!session) return status(401, { error: "Unauthorized access" });
				return { user: session.user, session: session.session };
			},
		},
	})
	.get(
		"/projects",
		async ({ query: { bookmarked } }) => {
			return bookmarked ? await getBookmarkedProjects() : await getAllProjects();
		},
		{
			auth: true,
			query: t.Object({
				bookmarked: t.Optional(t.Boolean()),
			}),
		},
	)
	.post(
		"/projects",
		async ({ body, user }) => {
			try {
				const createdProject = await insertProject(body.name, body.bookmarked ? true : false, user.id);
				return status(201, createdProject);
			} catch (error) {
				console.error("Failed to create project", error);
				return status(500, { error: "Failed to create project" });
			}
		},
		{
			auth: true,
			body: projectEditableDtoSchema,
		},
	)
	.put(
		"/projects/:id",
		async ({ params, body }) => {
			try {
				const updatedProject = await updateProject(params.id, body.name, body.bookmarked ? true : false);
				return updatedProject ? status(200, updatedProject) : status(404, { error: "Project not found" });
			} catch (error) {
				console.error("Failed to update project", error);
				return status(500, { error: "Failed to update project" });
			}
		},
		{
			auth: true,
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
			body: projectEditableDtoSchema,
		},
	)
	.get(
		"/tags",
		async ({ query: { name } }) => {
			const sanitisedName = name?.trim() || "";
			return sanitisedName ? await searchTagsByName(sanitisedName) : await getAllTagsAsTree();
		},
		{
			auth: true,
			query: t.Object({
				name: t.Optional(t.String()),
			}),
		},
	)
	.post(
		"/tags",
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
		},
	)
	.put(
		"/tags/:id",
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
		},
	)
	.delete(
		"/tags/:id",
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
		},
	);

export type ServerApp = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
export const OPTIONS = app.fetch;
