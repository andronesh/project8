"use server";

import * as projectsDAO from "@/database/dao/projectsDAO";
import { getAuthedUserId } from "./authActions";

export type Project = {
  id: number;
  name: string;
  bookmarked: boolean;
};

export async function createProject(name: string, bookmarked: boolean) {
  const nameSanitised = name.trim();

  if (!nameSanitised || nameSanitised.length === 0) {
    throw new Error("Project name should not be empty"); // TODO: properly handle validation
  }

  try {
    await projectsDAO.insertProject(nameSanitised, bookmarked);
  } catch (error) {
    console.error('Failed to save project with name"' + name + '"', error);
    throw error;
  }
}

export async function updateProject(
  id: number,
  name: string,
  bookmarked: boolean
) {
  const nameSanitised = name.trim();

  if (!nameSanitised || nameSanitised.length === 0) {
    throw new Error("Project name should not be empty"); // TODO: properly handle validation
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    throw new Error("User is not authenticated");
  }

  try {
    await projectsDAO.updateProject(id, nameSanitised, bookmarked);
  } catch (error) {
    console.error("Failed to update project with id = " + id, error);
    throw error;
  }
}
