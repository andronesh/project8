import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { findByGmailId, insertEmail, listEmails } from "@project8/domain/daos/emailsDAO";

import { authMiddleware } from "../middleware/auth.middleware";

export const emailsRoutes = new Hono<{
	Variables: {
		user: {
			id: string;
		};
	};
}>()
	.use("*", authMiddleware)
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				gmailId: z.string().trim().min(1).optional(),
			})
		),
		async (c) => {
			try {
				const { gmailId } = c.req.valid("query");
				if (gmailId) {
					const email = await findByGmailId(gmailId);

					if (!email) {
						return c.json({ error: "Email not found" }, 404);
					}

					return c.json([email]);
				}
				const emails = await listEmails();
				return c.json(emails);
			} catch (error) {
				console.error("Failed to fetch emails", error);
				return c.json({ error: "Failed to fetch emails" }, 500);
			}
		}
	)
	.post(
		"/",
		zValidator(
			"json",
			z.object({
				gmailId: z.string().trim().min(1, "gmailId should not be empty"),
				from: z.string().optional(),
				subject: z.string().optional(),
				body: z.string().optional(),
				internalDate: z.number().int().optional(),
			})
		),
		async (c) => {
			try {
				const body = c.req.valid("json");
				const createdEmail = await insertEmail(body.gmailId, body.from, body.subject, body.body, body.internalDate);
				return c.json(createdEmail, 201);
			} catch (error) {
				console.error("Failed to create email", error);
				return c.json({ error: "Failed to create email" }, 500);
			}
		}
	);
