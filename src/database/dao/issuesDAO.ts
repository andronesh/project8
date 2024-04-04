"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { issues } from "../schema";
import { Issue } from "@/types";

export const getIssuesForProject = async (
  projectId: number
): Promise<Issue[]> => {
  return await db
    .select()
    .from(issues)
    .where(eq(issues.project_id, projectId))
    .orderBy(issues.created_at);
};
