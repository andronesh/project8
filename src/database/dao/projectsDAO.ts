"use server";

import { Project } from "@/server-actions/projectsActions";
import { db } from "..";
import { projects } from "../schema";
import { eq } from "drizzle-orm";

export async function insertProject(name: string): Promise<boolean> {
  return db
    .insert(projects)
    .values({
      name,
    })
    .then((result) => {
      return true;
    });
}

export async function updateProject(id: number, name: string) {
  return db
    .update(projects)
    .set({ name })
    .where(eq(projects.id, id))
    .then((result) => {
      return true;
    });
}

export const getAllProjects = async (): Promise<Project[]> => {
  return await db.select().from(projects);
};
