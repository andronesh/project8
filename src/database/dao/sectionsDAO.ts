"use server";

import { db } from "..";
import { sections } from "../schema";
import { eq } from "drizzle-orm";
import { Section } from "@/types";

export async function insertSection(
  title: string,
  projectId: number
): Promise<Section> {
  return db
    .insert(sections)
    .values({
      title,
      projectId,
    })
    .returning()
    .then((inserted) => {
      return inserted[0];
    });
}

export async function updateSectionTitle(
  id: number,
  title: string
): Promise<Section> {
  return db
    .update(sections)
    .set({ title })
    .where(eq(sections.id, id))
    .returning()
    .then((result) => {
      return result[0];
    });
}

export const getSectionsForProject = async (
  projectId: number
): Promise<Section[]> => {
  return await db
    .select()
    .from(sections)
    .where(eq(sections.projectId, projectId))
    .orderBy(sections.position);
};
