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
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
  name: varchar("name", { length: 250 }).notNull(),
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
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
  createdBy: uuid("created_by").notNull(), // TODO add ref to users table

  type: issueType("type").default(IssueType.TASK).notNull(),
  status: issueStatus("status").default(IssueStatus.CREATED).notNull(),
  title: varchar("title", { length: 250 }).notNull(),
  description: text("description"),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
});

export const tiktokLinks = pgTable("tiktok_links", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),

  url: varchar("url", { length: 250 }),
  ownerName: varchar("owner_name", { length: 99 }),
  ownerUsername: varchar("owner_username", { length: 99 }),
  videoId: integer("video_id"),
  description: text("description"),
  thumbnail: text("thumbnail"),
  isRecipe: boolean("is_recipe").default(false).notNull(),
  descriptionImage: text("description_image"),
  tgSavedAt: varchar("tg_saved_at", { length: 99 }),
});
