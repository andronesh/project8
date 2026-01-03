import { issues } from "./database/schema";

export type Project = {
	id: number;
	name: string;
	bookmarked: boolean;
};

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
