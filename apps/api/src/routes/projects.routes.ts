import { getAllProjects, getBookmarkedProjects, insertProject, updateProject } from "@project8/domain/daos/projectsDAO";
import { Elysia, t, status } from "elysia";
import { authPlugin } from "../plugins/auth.plugin";

const projectEditableDtoSchema = t.Object({
	name: t.String({
		pattern: ".*\\S.*",
		message: "Project name should not be empty",
	}),
	bookmarked: t.Optional(t.Boolean()),
});

export const projectsRoutes = new Elysia({ prefix: "/projects" })
	.use(authPlugin)
	.get(
		"/",
		async ({ query: { bookmarked } }) => {
			return bookmarked ? await getBookmarkedProjects() : await getAllProjects();
		},
		{
			auth: true,
			query: t.Object({
				bookmarked: t.Optional(t.Boolean()),
			}),
		}
	)
	.post(
		"/",
		async ({ body, user }) => {
			try {
				const createdProject = await insertProject(body.name, body.bookmarked ?? false, user.id);

				return status(201, createdProject);
			} catch (error) {
				console.error("Failed to create project", error);
				return status(500, { error: "Failed to create project" });
			}
		},
		{
			auth: true,
			body: projectEditableDtoSchema,
		}
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			try {
				const updatedProject = await updateProject(params.id, body.name, body.bookmarked ?? false);

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
		}
	);
