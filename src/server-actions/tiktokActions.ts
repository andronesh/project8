"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export type TiktokLink = {
  id: number;
  url: string | null;
  ownerName: string | null;
  ownerUsername: string | null;
  videoId: number | null;
  description: string | null;
  thumbnail: string | null;

  isRecipe: boolean;
  descriptionImage: string | null;
  tgSavedAt: string | null;
};

export async function insertLink(
  url?: string,
  thumbnail?: string,
  isRecipe?: boolean,
  descriptionImage?: string,
  tgSavedAt?: string
) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.from("tiktok_links").insert([
    {
      url,
      thumbnail,
      is_recipe: isRecipe,
      description_image: descriptionImage,
      tg_saved_at: tgSavedAt,
    },
  ]);

  console.info("link inserted", data);

  if (error) {
    console.error('Failed to save tiktok link with url"' + url + '"', error);
    return false;
  }

  return true;
}
