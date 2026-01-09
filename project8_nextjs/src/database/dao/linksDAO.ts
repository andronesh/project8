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

export async function insertLink(dto: LinkEditableDto, currentUserId: string): Promise<Link> {
	return db
		.insert(links)
		.values({
			url: dto.url,
			title: dto.title,
			faviconUrl: dto.faviconUrl ? dto.faviconUrl : null,
			thumbnailUrl: dto.thumbnailUrl ? dto.thumbnailUrl : null,
			description: dto.description ? dto.description : null,
			comment: dto.comment ? dto.comment : null,
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
			url: dto.url,
			title: dto.title,
			faviconUrl: dto.faviconUrl ? dto.faviconUrl : null,
			thumbnailUrl: dto.thumbnailUrl ? dto.thumbnailUrl : null,
			description: dto.description ? dto.description : null,
			comment: dto.comment ? dto.comment : null,
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
