"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { issues } from "../schema";
import { Issue } from "@/types";
import { IssueStatus, IssueType } from "@/types";

export async function insertIssue(
  createdBy: string,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null,
  projectId: number
) {
  return db
    .insert(issues)
    .values({
      createdBy,
      type,
      status,
      title,
      description,
      projectId,
    })
    .then((result) => {
      return true;
    });
}

export async function updateIssue(
  id: number,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null
) {
  return db
    .update(issues)
    .set({ type, status, title, description })
    .where(eq(issues.id, id))
    .then((result) => {
      return true;
    });
}

export async function deleteIssue(id: number) {
  return db
    .delete(issues)
    .where(eq(issues.id, id))
    .then((result) => {
      return true;
    });
}

export const getIssuesForProject = async (
  projectId: number
): Promise<Issue[]> => {
  return await db
    .select()
    .from(issues)
    .where(eq(issues.projectId, projectId))
    .orderBy(issues.createdAt);
};
