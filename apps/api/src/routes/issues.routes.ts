import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import {
	deleteIssue,
	getIssueById,
	getIssueChildren,
	getIssuesForProject,
	getIssuesForProjectSection,
	insertIssue,
	updateIssue,
	updateIssuePosition,
} from "@project8/domain/daos/issuesDAO";
import { getSectionById } from "@project8/domain/daos/sectionsDAO";
import { IssueStatus, IssueType } from "@project8/domain/types";

import { authMiddleware } from "../middleware/auth.middleware";

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

const listIssuesQuerySchema = z
	.object({
		projectId: z.coerce.number().int().min(1).optional(),
		sectionId: z.union([z.literal("null").transform(() => null), z.coerce.number().int().min(1)]).optional(),
		parentId: z.coerce.number().int().min(1).optional(),
	})
	.refine((query) => query.projectId !== undefined || query.parentId !== undefined, {
		message: "Either projectId or parentId query parameter is required",
	});

const issuePositionDtoSchema = z.object({
	position: z.number().int().min(0),
	sectionId: z.number().int().min(1).nullable(),
});

const issueCreateDtoSchema = z.object({
	type: z.enum(IssueType).default(IssueType.TASK),
	status: z.enum(IssueStatus).default(IssueStatus.CREATED),
	title: z.string().trim().min(1, "Issue title should not be empty").max(250),
	description: z.string().nullable().optional(),
	projectId: z.number().int().min(1),
	sectionId: z.number().int().min(1).nullable().optional(),
	parentId: z.number().int().min(1).nullable().optional(),
});

const issueUpdateDtoSchema = z.object({
	type: z.enum(IssueType),
	status: z.enum(IssueStatus),
	title: z.string().trim().min(1, "Issue title should not be empty").max(250),
	description: z.string().nullable().optional(),
});

export const issuesRoutes = new Hono<{
	Variables: {
		user: {
			id: string;
		};
	};
}>()
	.use("*", authMiddleware)
	.get("/", zValidator("query", listIssuesQuerySchema), async (c) => {
		try {
			const { projectId, sectionId, parentId } = c.req.valid("query");

			if (parentId !== undefined) {
				const children = await getIssueChildren(parentId);
				return c.json(children);
			}

			if (projectId === undefined) {
				return c.json({ error: "projectId query parameter is required when parentId is not provided" }, 400);
			}

			const issuesList =
				sectionId !== undefined
					? await getIssuesForProjectSection(projectId!, sectionId)
					: await getIssuesForProject(projectId!);

			return c.json(issuesList);
		} catch (error) {
			console.error("Failed to fetch issues", error);
			return c.json({ error: "Failed to fetch issues" }, 500);
		}
	})
	.post("/", zValidator("json", issueCreateDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");
			const user = c.get("user");

			// TODO: Validate user permissions to create the issue

			// TODO : Validate existence of project/section/parent by handling Foreign Key constraint error
			let section;
			if (body.sectionId !== undefined && body.sectionId !== null) {
				section = await getSectionById(body.sectionId);
				if (!section || section.projectId !== body.projectId) {
					return c.json({ error: "Section not found in project" }, 404);
				}
			}

			let parent;
			if (body.parentId !== undefined && body.parentId !== null) {
				parent = await getIssueById(body.parentId);
				if (!parent || parent.projectId !== body.projectId) {
					return c.json({ error: "Parent issue not found in project" }, 404);
				}
			}

			const createdIssue = await insertIssue(
				user.id,
				body.type,
				body.status,
				body.title,
				body.description ?? null,
				body.projectId,
				section,
				parent
			);

			return c.json(createdIssue, 201);
		} catch (error) {
			console.error("Failed to create issue", error);
			return c.json({ error: "Failed to create issue" }, 500);
		}
	})
	.put("/:id", zValidator("param", byIdParamsSchema), zValidator("json", issueUpdateDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			const existingIssue = await getIssueById(id);
			if (!existingIssue) {
				return c.json({ error: "Issue not found" }, 404);
			}

			// TODO: Validate user permissions to update the issue

			const updatedIssue = await updateIssue(id, body.type, body.status, body.title, body.description ?? null);
			return c.json(updatedIssue);
		} catch (error) {
			console.error("Failed to update issue", error);
			return c.json({ error: "Failed to update issue" }, 500);
		}
	})
	.patch("/:id/position", zValidator("param", byIdParamsSchema), zValidator("json", issuePositionDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			const existingIssue = await getIssueById(id);
			if (!existingIssue) {
				return c.json({ error: "Issue not found" }, 404);
			}

			// TODO: Validate user permissions to update the issue position

			let sectionTitle: string | null = null;
			if (body.sectionId !== null) {
				const section = await getSectionById(body.sectionId);
				if (!section || section.projectId !== existingIssue.projectId) {
					return c.json({ error: "Section not found in project" }, 404);
				}
				sectionTitle = section.title;
			}

			await updateIssuePosition(id, body.position, body.sectionId, sectionTitle);
			const updatedIssue = await getIssueById(id);

			return c.json(updatedIssue ?? existingIssue);
		} catch (error) {
			console.error("Failed to update issue position", error);
			return c.json({ error: "Failed to update issue position" }, 500);
		}
	})
	.delete("/:id", zValidator("param", byIdParamsSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");

			const existingIssue = await getIssueById(id);
			if (!existingIssue) {
				return c.json({ error: "Issue not found" }, 404);
			}

			// TODO: Validate user permissions to delete the issue

			await deleteIssue(id);
			return c.json({});
		} catch (error) {
			console.error("Failed to delete issue", error);
			return c.json({ error: "Failed to delete issue" }, 500);
		}
	});
