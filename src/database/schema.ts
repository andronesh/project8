import { IssueStatus, IssueType } from "@/types";
import { sql } from "drizzle-orm";
import {
	pgTable,
	serial,
	varchar,
	timestamp,
	pgEnum,
	uuid,
	text,
	integer,
	boolean,
	smallserial,
	AnyPgColumn,
	index,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	name: varchar("name", { length: 88 }).notNull(),
	bookmarked: boolean("bookmarked").default(false).notNull(),
});

export const sections = pgTable("sections", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 88 }).notNull(),
	position: smallserial("position"),
	projectId: integer("project_id")
		.references(() => projects.id)
		.notNull(),
});

export const issueType = pgEnum("issue_type", [
	IssueType.TASK,
	IssueType.IDEA,
	IssueType.STORY,
	IssueType.BUG,
	IssueType.CONCERN,
]);

export const issueStatus = pgEnum("issue_status", [
	IssueStatus.CREATED,
	IssueStatus.STARTED,
	IssueStatus.PAUSED,
	IssueStatus.DONE,
	IssueStatus.CLOSED,
]);

export const issues = pgTable("issues", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	createdBy: uuid("created_by").notNull(), // TODO add ref to users table

	type: issueType("type").default(IssueType.TASK).notNull(),
	status: issueStatus("status").default(IssueStatus.CREATED).notNull(),
	title: varchar("title", { length: 250 }).notNull(),
	description: text("description"),
	parentId: integer("parent_id").references((): AnyPgColumn => issues.id, { onDelete: "cascade" }),
	projectId: integer("project_id")
		.references(() => projects.id)
		.notNull(),
	sectionId: integer("section_id").references(() => sections.id),
	sectionTitle: varchar("section_title", { length: 88 }),
	position: serial("position").notNull(),
});

export const tiktokLinks = pgTable("tiktok_links", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }),

	url: varchar("url", { length: 121 }),
	ownerName: varchar("owner_name", { length: 99 }),
	ownerUsername: varchar("owner_username", { length: 99 }),
	videoId: integer("video_id"),
	description: text("description"),
	thumbnail: text("thumbnail"),
	isRecipe: boolean("is_recipe").default(false).notNull(),
	descriptionImage: text("description_image"),
	tgSavedAt: varchar("tg_saved_at", { length: 22 }),
});

export const vaults = pgTable("vaults", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 88 }).notNull(),
	url: varchar("url", { length: 128 }).unique(),
	token: varchar("token", { length: 36 }).notNull().unique(),

	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const emails = pgTable(
	"emails",
	{
		id: serial("id").primaryKey(),
		gmailId: varchar("gmail_id").notNull(),
		from: varchar("from"),
		subject: varchar("subject"),
		date: varchar("date"),
		body: varchar("body"),
		internalDate: integer("internal_date"),
		isParsed: boolean("is_parsed").default(false),
		isOriginDeleted: boolean("is_origin_deleted").default(false),

		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => [index("email_gmail_ids_idx").on(table.gmailId), index("email_from_idx").on(table.from)],
);

export type EmailEntity = typeof emails.$inferSelect;
