import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { auth } from "./utils/auth";

import { projectsRoutes } from "./routes/projects.routes";
import { tagsRoutes } from "./routes/tags.routes";
import { linksRoutes } from "./routes/links.routes";

const allowedOriginsString = process.env.ALLOWED_ORIGINS || "";

const allowedOrigins = allowedOriginsString
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

export const app = new Elysia({ prefix: "/api" })
	.use(
		cors({
			origin: ({ headers }) => {
				const originHeader = headers.get("origin");

				return originHeader !== null && allowedOrigins.includes(originHeader);
			},
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		})
	)
	.mount(auth.handler)
	.use(projectsRoutes)
	.use(tagsRoutes)
	.use(linksRoutes);

export type ServerApp = typeof app;
