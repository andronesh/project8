import { getAllProjects, insertProject, updateProject } from "@/database/dao/projectsDAO";
import { Elysia, t, status } from "elysia";

const projectEditableDtoSchema = t.Object({
	name: t.String({ pattern: ".*\\S.*", message: "Project name should not be empty" }),
	bookmarked: t.Optional(t.Boolean()),
});

const app = new Elysia({ prefix: "/api" })
	.get("/projects", async () => {
		return await getAllProjects();
	})
	.post(
		"/projects",
		async ({ body }) => {
			try {
				await insertProject(body.name, body.bookmarked ? true : false);
				return status(201, { success: true });
			} catch (error) {
				console.error("Failed to create project", error);
				return status(500, { error: "Failed to create project" });
			}
		},
		{
			body: projectEditableDtoSchema,
		},
	)
	.put(
		"/projects/:id",
		async ({ params, body }) => {
			try {
				await updateProject(params.id, body.name, body.bookmarked ? true : false);
				return status(200, { success: true });
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

export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
