import { z } from "zod";
import { issues } from "./database/schema";

export type Project = {
	id: number;
	name: string;
	bookmarked: boolean;
};

export const tagEditableDtoSchema = z.object({
	name: z.string().refine((value) => value.trim().length > 0, "Tag name should not be empty"),
	comment: z.string().nullable().optional(),
	parentId: z.number().int().min(1).nullable().optional(),
});

export type TagEditableDto = z.infer<typeof tagEditableDtoSchema>;

export type Tag = TagEditableDto & {
	id: number;
};

export type TagNode = Tag & {
	children?: TagNode[];
};

export const linkEditableDtoSchema = z.object({
	url: z.string().refine((value) => value.trim().length > 0, "Link URL should not be empty"),
	title: z.string().nullable().optional(), // TODO: now it's nullable because of drizzle, validate needness after refactor
	faviconUrl: z.string().nullable().optional(),
	thumbnailUrl: z.string().nullable().optional(),
	description: z.string().nullable().optional(),
	comment: z.string().nullable().optional(),
});

export type LinkEditableDto = z.infer<typeof linkEditableDtoSchema>;

export type Link = LinkEditableDto & {
	id: number;
	createdAt: Date;
	updatedAt: Date;
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

export type TiktokLink = {
	id: number;
	url: string | null;
	ownerName: string | null;
	ownerUsername: string | null;
	videoId: number | null;
	description: string | null;
	thumbnail: string | null;

	isRecipe: boolean;
	descriptionImage: string | null;
	tgSavedAt: string | null;
};
