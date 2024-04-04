"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { issues } from "../schema";
import { Issue } from "@/types";
import { IssueStatus, IssueType } from "@/types";

export async function insertIssue(
  created_by: string,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null,
  project_id: number
) {
  return db
    .insert(issues)
    .values({
      created_by,
      type,
      status,
      title,
      description,
      project_id,
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
export const getIssuesForProject = async (
  projectId: number
): Promise<Issue[]> => {
  return await db
    .select()
    .from(issues)
    .where(eq(issues.project_id, projectId))
    .orderBy(issues.created_at);
};
