"use server";

import { IssueStatus, IssueType, Section } from "@/types";
import * as issuesDAO from "@/database/dao/issuesDAO";
import { getAuthedUserId } from "./authActions";

export async function createIssue(
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null,
  projectId: number,
  section?: Section
) {
  if (!title || title.length === 0) {
    throw new Error("Field 'title' should not be empty");
  }

  if (!projectId) {
    throw new Error("Field 'projectId' should be present");
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    throw new Error("User is not authenticated");
  }

  try {
    await issuesDAO.insertIssue(
      userId,
      type,
      status,
      title,
      description,
      projectId,
      section
    );
  } catch (error) {
    console.error(
      "Failed to save issue " +
        JSON.stringify({ type, status, title, projectId }),
      error
    );
    throw error;
  }
}

export async function updateIssue(
  id: number,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null
) {
  if (!id) {
    throw new Error("It's impossible to update issue without it's id");
  }

  if (!title || title.length === 0) {
    throw new Error("Field 'title' should not be empty");
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    throw new Error("User is not authenticated");
  }

  try {
    await issuesDAO.updateIssue(id, type, status, title, description);
  } catch (error) {
    console.error("Failed to update issue with id=" + id, error);
    throw error;
  }
}

export async function removeIssue(id: number) {
  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    throw new Error("User is not authenticated");
  }

  try {
    await issuesDAO.deleteIssue(id);
  } catch (error) {
    console.error(`Failed to delete issue with id=${id}`, error);
    throw error;
  }
}
