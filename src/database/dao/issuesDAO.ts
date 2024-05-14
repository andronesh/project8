"use server";

import { eq, and, isNull } from "drizzle-orm";
import { db } from "..";
import { issues } from "../schema";
import { Issue, Section } from "@/types";
import { IssueStatus, IssueType } from "@/types";

export async function insertIssue(
  createdBy: string,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null,
  projectId: number,
  section?: Section
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
      sectionId: section ? section.id : null,
      sectionTitle: section ? section.title : null,
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
    .set({ type, status, title, description, updatedAt: new Date() })
    .where(eq(issues.id, id))
    .then((result) => {
      return true;
    });
}

export async function updateIssueSection(
  issueId: number,
  sectionId: number | null,
  sectionTitle: string | null
) {
  return db
    .update(issues)
    .set({ sectionId, sectionTitle, updatedAt: new Date() })
    .where(eq(issues.id, issueId))
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

export const getIssuesForProjectSection = async (
  projectId: number,
  sectionId: number | null
): Promise<Issue[]> => {
  return await db
    .select()
    .from(issues)
    .where(
      and(
        eq(issues.projectId, projectId),
        sectionId ? eq(issues.sectionId, sectionId) : isNull(issues.sectionId)
      )
    )
    .orderBy(issues.createdAt);
};
