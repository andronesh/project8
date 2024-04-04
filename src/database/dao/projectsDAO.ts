"use server";

import { Project } from "@/server-actions/projectsActions";
import { db } from "..";
import { projects } from "../schema";

export const getAllProjects = async (): Promise<Project[]> => {
  return await db.select().from(projects);
};
