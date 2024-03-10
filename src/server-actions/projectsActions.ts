"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Project = {
  id: string;
  name: string;
};

export async function saveProject(formData: FormData) {
  console.info("Executing saveProject server action");
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
