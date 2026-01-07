import { issues } from "./database/schema";
import { Static, t } from "elysia";

export type Project = {
	id: number;
	name: string;
	bookmarked: boolean;
};

export const tagEditableDtoSchema = t.Object({
	name: t.String({ pattern: ".*\\S.*", message: "Tag name should not be empty" }),
	comment: t.Optional(t.MaybeEmpty(t.String())),
	parentId: t.Optional(t.MaybeEmpty(t.Number({ minimum: 1 }))),
});

export type TagEditableDto = Static<typeof tagEditableDtoSchema>;

export type Tag = TagEditableDto & {
	id: number;
};

export type TagNode = Tag & { children?: TagNode[] };

export type Section = {
	id: number;
	title: string;
	position: number;
	projectId: number;
};

export enum IssueType {
	TASK = "TASK",
	IDEA = "IDEA",
	STORY = "STORY",
	BUG = "BUG",
	CONCERN = "CONCERN",
}

export enum IssueStatus {
	CREATED = "CREATED",
	STARTED = "STARTED",
	PAUSED = "PAUSED",
	DONE = "DONE",
	CLOSED = "CLOSED",
}

export type Issue = typeof issues.$inferSelect;
