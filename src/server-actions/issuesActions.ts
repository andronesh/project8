"use server";

import { IssueStatus, IssueType } from "@/types";
import { revalidatePath } from "next/cache";
import * as issuesDAO from "@/database/dao/issuesDAO";
import { getAuthedUserId } from "./authActions";

export async function createIssue(
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null,
  projectId: number
) {
  if (!title || title.length === 0) {
    return false;
  }

  if (!projectId) {
    return false;
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    return false;
  }

  try {
    await issuesDAO.insertIssue(
      userId,
      type,
      status,
      title,
      description,
      projectId
    );
  } catch (error) {
    console.error(
      "Failed to save issue " +
        JSON.stringify({ type, status, title, projectId }),
      error
    );
    return false;
  }

  revalidatePath("/dashboard");

  return true;
}

export async function updateIssue(
  id: number,
  type: IssueType,
  status: IssueStatus,
  title: string,
  description: string | null
) {
  if (!id) {
    return false;
  }

  if (!title || title.length === 0) {
    return false;
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    return false;
  }

  try {
    await issuesDAO.updateIssue(id, type, status, title, description);
  } catch (error) {
    console.error("Failed to update issue with id=" + id, error);
    return false;
  }

  revalidatePath("/dashboard");

  return true;
}

export async function removeIssue(id: number) {
  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    return false;
  }

  try {
    await issuesDAO.deleteIssue(id);
  } catch (error) {
    console.error(`Failed to delete issue with id=${id}`, error);
    return false;
  }

  return true;
}
