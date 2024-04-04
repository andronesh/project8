"use server";

import * as projectsDAO from "@/database/dao/projectsDAO";
import { revalidatePath } from "next/cache";
import { getAuthedUserId } from "./authActions";

export type Project = {
  id: number;
  name: string;
};

export async function createProject(formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name || name.length === 0) {
    return false;
  }

  try {
    await projectsDAO.insertProject(name);

    revalidatePath("/dashboard");

    return true;
  } catch (error) {
    console.error('Failed to save project with name"' + name + '"', error);
    return false;
  }
}

export async function updateProject(formData: FormData) {
  const id = Number(formData.get("id")?.toString().trim());
  const name = formData.get("name")?.toString().trim();

  if (!id || isNaN(id)) {
    return false;
  }

  if (!name || name.length === 0) {
    return false;
  }

  const userId = await getAuthedUserId();
  if (!userId) {
    console.error("User is not authenticated");
    return false;
  }

  try {
    await projectsDAO.updateProject(id, name);
    revalidatePath("/dashboard");

    return true;
  } catch (error) {
    console.error("Failed to update project with id = " + id, error);
    return false;
  }
}
