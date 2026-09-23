"use server";

import { insertTiktokLink } from "@project8/domain/daos/titoLinksDAO";

export async function insertLink(
	url?: string,
	thumbnail?: string | null,
	isRecipe?: boolean,
	descriptionImage?: string | null,
	tgSavedAt?: string | null
) {
	try {
		await insertTiktokLink(url, thumbnail, isRecipe, descriptionImage, tgSavedAt);
	} catch (error) {
		console.error('Failed to save tiktok link with url"' + url + '"', error);
		return false;
	}

	return true;
}
