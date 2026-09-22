"use server";

import { insertTiktokLink } from "@/database/dao/titoLinksDAO";

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
	thumbnail?: string | null,
	isRecipe?: boolean,
	descriptionImage?: string | null,
	tgSavedAt?: string | null,
) {
	try {
		await insertTiktokLink(url, thumbnail, isRecipe, descriptionImage, tgSavedAt);
	} catch (error) {
		console.error('Failed to save tiktok link with url"' + url + '"', error);
		return false;
	}

	return true;
}
