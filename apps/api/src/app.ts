import { cors } from "hono/cors";
import { Hono } from "hono";

import { auth } from "./utils/auth";
import { projectsRoutes } from "./routes/projects.routes";
import { sectionsRoutes } from "./routes/sections.routes";
import { issuesRoutes } from "./routes/issues.routes";
import { tagsRoutes } from "./routes/tags.routes";
import { linksRoutes } from "./routes/links.routes";
import { vaultsRoutes } from "./routes/vaults.routes";
import { emailsRoutes } from "./routes/emails.routes";
import { tiktokLinksRoutes } from "./routes/tiktok-links.routes";

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
			allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	)
	.on(["GET", "POST"], "/auth/*", (c) => {
		return auth.handler(c.req.raw);
	})
	.route("/projects", projectsRoutes)
	.route("/sections", sectionsRoutes)
	.route("/issues", issuesRoutes)
	.route("/tags", tagsRoutes)
	.route("/links", linksRoutes)
	.route("/vaults", vaultsRoutes)
	.route("/emails", emailsRoutes)
	.route("/tiktok/links", tiktokLinksRoutes);

export type ServerApp = typeof app;
