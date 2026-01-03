import {
	getAllProjects,
	getBookmarkedProjects,
	insertProject,
	updateProject,
} from "@/database/dao/projectsDAO";
import { auth } from "@/utils/auth";
import { Elysia, t, status } from "elysia";

const projectEditableDtoSchema = t.Object({
	name: t.String({ pattern: ".*\\S.*", message: "Project name should not be empty" }),
	bookmarked: t.Optional(t.Boolean()),
});

const app = new Elysia({ prefix: "/api" })
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({ headers });
				if (!session) return status(401);
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
			params: t.Object({
				id: t.Number({ minimum: 1 }),
			}),
			body: projectEditableDtoSchema,
		},
	);

export type ServerApp = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
