"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type TiktokLinkEntity = {
  id: number;
  url: string;
  owner_name: string;
  owner_username: string;
  video_id: number;
  description: string;
  thumbnail: string;

  is_recipe: boolean;
  description_image: string;
  tg_saved_at: string;
};

export type TiktokLink = {
  id: number;
  url: string;
  ownerName: string;
  ownerUsername: string;
  videoId: number;
  description: string;
  thumbnail: string;

  isRecipe: boolean;
  descriptionImage: string;
  tgSavedAt: string;
};

function convertTiktokLinkEntityToDto(entity: TiktokLinkEntity): TiktokLink {
  return {
    id: entity.id,
    url: entity.url,
    ownerName: entity.owner_name,
    ownerUsername: entity.owner_username,
    videoId: entity.video_id,
    description: entity.description,
    thumbnail: entity.thumbnail,
    isRecipe: entity.is_recipe,
    descriptionImage: entity.description_image,
    tgSavedAt: entity.tg_saved_at,
  };
}

export async function getTiktokLinks(recipes: boolean): Promise<TiktokLink[]> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from("tiktok_links")
    .select("*")
    .eq("is_recipe", recipes)
    .order("created_at", { ascending: true });

  return data ? data.map(convertTiktokLinkEntityToDto) : [];
}

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
