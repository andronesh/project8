"use server";

import * as sectionsDAO from "@/database/dao/sectionsDAO";
import { Section } from "@/types";

export type ActionError = {
	key: string;
	message?: string;
};

export type ActionResult<T> = {
	result?: T;
	error?: ActionError;
};

export async function createSection(title: string, projectId: number): Promise<ActionResult<Section>> {
	if (!title || title.length === 0) {
		return {
			error: {
				key: "validation.title.isEmpty",
				message: "Title should not be empty",
			},
		};
	}

	try {
		const result = await sectionsDAO.insertSection(title, projectId);

		return {
			result: result,
		};
	} catch (error) {
		console.error(`Failed to save section with title "${title}" for project with id ${projectId}`, error);
		return {
			error: {
				key: "internal",
				message: error + "",
			},
		};
	}
}

export async function updateSection(id: number, title: string): Promise<ActionResult<Section>> {
	if (!title || title.length === 0) {
		return {
			error: {
				key: "validation.title.isEmpty",
				message: "Title should not be empty",
			},
		};
	}

	try {
		const result = await sectionsDAO.updateSectionTitle(id, title);

		return {
			result: result,
		};
	} catch (error) {
		console.error(`Failed to update section title to "${title}" for section with id ${id}`, error);
		return {
			error: {
				key: "internal",
				message: error + "",
			},
		};
	}
}
