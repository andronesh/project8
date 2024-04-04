"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { tiktokLinks } from "../schema";
import { TiktokLink } from "@/server-actions/tiktokActions";

export async function insertTiktokLink(
  url?: string,
  thumbnail?: string,
  isRecipe?: boolean,
  descriptionImage?: string,
  tgSavedAt?: string
) {
  return db
    .insert(tiktokLinks)
    .values({
      url,
      thumbnail,
      isRecipe,
      descriptionImage,
      tgSavedAt,
    })
    .then((result) => {
      return true;
    });
}

export async function getTiktokLinks(recipes: boolean): Promise<TiktokLink[]> {
  return await db
    .select()
    .from(tiktokLinks)
    .where(eq(tiktokLinks.isRecipe, recipes))
    .orderBy(tiktokLinks.createdAt);
}
