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
