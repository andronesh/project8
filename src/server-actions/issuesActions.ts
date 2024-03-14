"use server";

import { IssueStatus, IssueType } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createIssue(
  type: IssueType,
  status: IssueStatus,
  title: string,
  project_id: number
) {
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
    type,
    status,
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

export async function updateIssue(
  id: number,
  type: IssueType,
  status: IssueStatus,
  title: string
) {
  if (!id) {
    return false;
  }

  if (!title || title.length === 0) {
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

  const { data, error } = await supabase
    .from("issues")
    .update({ title, type, status })
    .match({ id });

  if (error) {
    console.error("Failed to update issue with id=" + id, error);
    return false;
  }

  revalidatePath("/dashboard");

  return true;
}
