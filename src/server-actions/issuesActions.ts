"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

enum IssueType {
  TASK,
  IDEA,
  STORY,
  BUG,
  CONCERN,
}

enum IssueStatus {
  CREATED,
  STARTED,
  PAUSED,
  DONE,
  CLOSED,
}

export type Issue = {
  id: number;
  // created_at timestamp with time zone default now(),
  // updated_at timestamp with time zone,
  created_by: string;

  type: IssueType;
  status: IssueStatus;
  title: string;
  description: string;

  // assignee uuid references auth.users,
  project_id: number;
  parent_id: number;
};

export async function createIssue(title: string, project_id: number) {
  if (!title || title.length === 0) {
    return false;
  }

  if (!project_id) {
    return false;
  }

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    console.error("User is not authenticated");
    return false;
  }

  const dataToSave = {
    created_by: session.user.id,
    type: IssueType[IssueType.TASK],
    title,
    project_id,
  };

  const { data, error } = await supabase.from("issues").insert([dataToSave]);

  if (error) {
    console.error("Failed to save issue " + JSON.stringify(dataToSave), error);
    return false;
  }

  console.info("New issue created: " + JSON.stringify(dataToSave), data);

  revalidatePath("/dashboard");

  return true;
}
