import { getAllProjects } from "@/database/dao/projectsDAO";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" }).get("/projects", async () => {
	return await getAllProjects();
});

export const GET = app.fetch;
export const POST = app.fetch;
