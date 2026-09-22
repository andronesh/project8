"use server";

import { Tag, TagEditableDto, TagNode } from "@/types";
import { db } from "..";
import { tags } from "../schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function insertTag(dto: TagEditableDto, ownerId: string): Promise<Tag> {
	return db
		.insert(tags)
		.values({
			name: dto.name,
			comment: dto.comment ? dto.comment : null,
			parentId: dto.parentId ? dto.parentId : null,
			ownerId: ownerId,
		})
		.returning()
		.then((result) => result[0]);
	// TODO convert errors to proper format (e.g., foreign key violation for parentId)
}

export async function updateTag(id: number, dto: TagEditableDto): Promise<Tag | undefined> {
	return db
		.update(tags)
		.set({
			name: dto.name,
			comment: dto.comment ? dto.comment : null,
			parentId: dto.parentId ? dto.parentId : null,
			updatedAt: new Date(),
		})
		.where(eq(tags.id, id))
		.returning()
		.then((result) => result[0]);
	// TODO convert errors to proper format (e.g., foreign key violation for parentId)
}

export const getAllTagsAsTree = async (): Promise<TagNode[]> => {
	const all = await db.select().from(tags).orderBy(tags.createdAt);

	const map = new Map<number, TagNode>();
	const roots: TagNode[] = [];

	for (const t of all) {
		map.set(t.id, { ...t, children: [] });
	}

	for (const t of all) {
		const node = map.get(t.id)!;
		if (t.parentId === null || typeof t.parentId === "undefined") {
			roots.push(node);
		} else {
			const parent = map.get(t.parentId);
			if (parent) parent.children!.push(node);
			else roots.push(node);
		}
	}

	return roots;
};

export const searchTagsByName = async (name: string): Promise<Tag[]> => {
	if (!name || name.trim() === "") {
		return [];
	}
	const needle = `%${name.toLowerCase()}%`;
	return await db
		.select()
		.from(tags)
		.where(sql`LOWER(${tags.name}) LIKE ${needle}`);
};

export async function deleteTag(tagId: number, ownerId: string) {
	const tagToDelete = await db
		.select()
		.from(tags)
		.where(eq(tags.id, tagId))
		.then((result) => result[0]);

	if (!tagToDelete) {
		throw new Error("Tag not found");
	}

	if (tagToDelete.ownerId !== ownerId) {
		throw new Error("Tags can only be deleted by their owner");
	}

	await db.delete(tags).where(eq(tags.id, tagId));
}
