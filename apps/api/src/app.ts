import { cors } from "hono/cors";
import { Hono } from "hono";

import { auth } from "./utils/auth";
import { projectsRoutes } from "./routes/projects.routes";
import { tagsRoutes } from "./routes/tags.routes";
import { linksRoutes } from "./routes/links.routes";

export type AppVariables = {
	user: typeof auth.$Infer.Session.user;
	session: typeof auth.$Infer.Session.session;
};

const allowedOriginsString = process.env.ALLOWED_ORIGINS || "";

const allowedOrigins = allowedOriginsString
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const baseApp = new Hono<{
	Variables: AppVariables;
}>().basePath("/api");

export const app = baseApp
	.use(
		"*",
		cors({
			origin: (origin) => {
				if (!origin) {
					return undefined;
				}

				return allowedOrigins.includes(origin) ? origin : undefined;
			},
			allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	)
	.on(["GET", "POST"], "/auth/*", (c) => {
		return auth.handler(c.req.raw);
	})
	.route("/projects", projectsRoutes)
	.route("/tags", tagsRoutes)
	.route("/links", linksRoutes);

export type ServerApp = typeof app;
