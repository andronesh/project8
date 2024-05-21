"use server";

import { Project } from "@/server-actions/projectsActions";
import { db } from "..";
import { projects } from "../schema";
import { desc, eq } from "drizzle-orm";

export async function insertProject(name: string, bookmarked: boolean): Promise<boolean> {
  return db
    .insert(projects)
    .values({
      name,
      bookmarked,
    })
    .then((result) => {
      return true;
    });
}

export async function updateProject(id: number, name: string, bookmarked: boolean) {
  return db
    .update(projects)
    .set({ name, bookmarked, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .then((result) => {
      return true;
    });
}

export const getAllProjects = async (): Promise<Project[]> => {
  return await db.select().from(projects).orderBy(desc(projects.bookmarked), projects.createdAt);
};

export const getBookmarkedProjects = async (): Promise<Project[]> => {
  return await db.select().from(projects).where(eq(projects.bookmarked, true)).orderBy(projects.createdAt);
};
