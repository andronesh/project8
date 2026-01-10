"use server";

import { Link, LinkEditableDto } from "@/types";
import { db } from "..";
import { links } from "../schema";
import { eq, like } from "drizzle-orm";

async function verifyExistenceAndOwnership(entityId: number, currentUserId: string): Promise<boolean> {
	const existingEntity = await db
		.select({ id: links.id, ownerId: links.createdBy })
		.from(links)
		.where(eq(links.id, entityId))
		.limit(1);

	if (existingEntity.length === 0) {
		return false;
		// TODO throw NotFound error
	}
	if (existingEntity[0].ownerId !== currentUserId) {
		return false;
		// TODO throw UnauthorisedAction error
	}
	return true;
}

function convertDtoToEntity(dto: LinkEditableDto) {
	return {
		url: dto.url,
		title: dto.title ? dto.title.trim() : null,
		faviconUrl: dto.faviconUrl ? dto.faviconUrl.trim() : null,
		thumbnailUrl: dto.thumbnailUrl ? dto.thumbnailUrl.trim() : null,
		description: dto.description ? dto.description.trim() : null,
		comment: dto.comment ? dto.comment.trim() : null,
	};
}

export async function insertLink(dto: LinkEditableDto, currentUserId: string): Promise<Link> {
	return db
		.insert(links)
		.values({
			...convertDtoToEntity(dto),
			createdBy: currentUserId,
		})
		.returning()
		.then((result) => result[0]);
}

export async function updateLink(
	id: number,
	dto: LinkEditableDto,
	currentUserId: string,
): Promise<Link | undefined> {
	const verified = await verifyExistenceAndOwnership(id, currentUserId);
	if (!verified) return undefined;

	return db
		.update(links)
		.set({
			...convertDtoToEntity(dto),
		})
		.where(eq(links.id, id))
		.returning()
		.then((result) => result[0]);
}

export async function deleteLink(id: number, currentUserId: string) {
	const verified = await verifyExistenceAndOwnership(id, currentUserId);
	if (!verified) return undefined;

	await db.delete(links).where(eq(links.id, id));
}

export async function getAllLinksPaginated(limit: number = 100, offset: number = 0): Promise<Link[]> {
	return db.select().from(links).limit(limit).offset(offset).orderBy(links.createdAt);
}

export async function findLinksByUrl(url: string): Promise<Link[]> {
	return db.select().from(links).where(like(links.url, url));
}
