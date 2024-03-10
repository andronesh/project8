"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Project = {
  id: string;
  name: string;
};

export async function createProject(formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name || name.length === 0) {
    return false;
  }

  const id = crypto.randomUUID();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from("projects")
    .insert([{ id, name }]);

  if (error) {
    console.error('Failed to save project with name"' + name + '"', error);
    return false;
  }

  console.info("New project created:", data);

  revalidatePath("/dashboard");

  return true;
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id")?.toString().trim();
  const name = formData.get("name")?.toString().trim();

  if (!name || name.length === 0) {
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
    .from("projects")
    .update({ name })
    .match({ id });

  if (error) {
    console.error("Failed to update project with id = " + id, error);
    return false;
  }

  console.info("New project created:", data);

  revalidatePath("/dashboard");

  return true;
}
