"use server";

import { eq, and, isNull, sql, gte } from "drizzle-orm";
import { db } from "..";
import { issues } from "../schema";
import { Issue, Section } from "@/types";
import { IssueStatus, IssueType } from "@/types";

const deriveIssueSectionId = (section: Section | undefined, parent: Issue | undefined): number | null => {
	if (section) {
		return section.id;
	}
	if (parent) {
		return parent.sectionId;
	}
	return null;
};

const deriveIssueSectionTitle = (section: Section | undefined, parent: Issue | undefined): string | null => {
	if (section) {
		return section.title;
	}
	if (parent) {
		return parent.sectionTitle;
	}
	return null;
};

export async function insertIssue(
	createdBy: string,
	type: IssueType,
	status: IssueStatus,
	title: string,
	description: string | null,
	projectId: number,
	section?: Section,
	parent?: Issue,
): Promise<Issue> {
	return db
		.insert(issues)
		.values({
			createdBy,
			type,
			status,
			title,
			description,
			projectId,
			parentId: parent ? parent.id : null,
			sectionId: deriveIssueSectionId(section, parent),
			sectionTitle: deriveIssueSectionTitle(section, parent),
		})
		.returning()
		.then((result) => {
			return result[0];
		});
}

export async function updateIssue(
	id: number,
	type: IssueType,
	status: IssueStatus,
	title: string,
	description: string | null,
): Promise<Issue> {
	return db
		.update(issues)
		.set({ type, status, title, description, updatedAt: new Date() })
		.where(eq(issues.id, id))
		.returning()
		.then((result) => {
			return result[0];
		});
}

export async function updateIssuePosition(
	issueId: number,
	position: number,
	sectionId: number | null,
	sectionTitle: string | null,
) {
	const sectionIdCondition = sectionId === null ? isNull(issues.sectionId) : eq(issues.sectionId, sectionId);
	return db.transaction(async (tx) => {
		await tx
			.update(issues)
			.set({ position: sql`${issues.position} + 1` })
			.where(and(sectionIdCondition, gte(issues.position, position)));
		await tx
			.update(issues)
			.set({ sectionId, sectionTitle, position, updatedAt: new Date() })
			.where(eq(issues.id, issueId));
	});
}

export async function deleteIssue(id: number) {
	return db
		.delete(issues)
		.where(eq(issues.id, id))
		.then((result) => {
			return true;
		});
}

export const getIssuesForProject = async (projectId: number): Promise<Issue[]> => {
	return await db
		.select()
		.from(issues)
		.where(and(eq(issues.projectId, projectId), isNull(issues.parentId)))
		.orderBy(issues.createdAt);
};

export const getIssuesForProjectSection = async (
	projectId: number,
	sectionId: number | null,
): Promise<Issue[]> => {
	return await db
		.select()
		.from(issues)
		.where(
			and(
				eq(issues.projectId, projectId),
				sectionId ? eq(issues.sectionId, sectionId) : isNull(issues.sectionId),
				isNull(issues.parentId),
			),
		)
		.orderBy(issues.position);
};

export const getIssueChildren = async (parentId: number): Promise<Issue[]> => {
	return await db.select().from(issues).where(eq(issues.parentId, parentId)).orderBy(issues.createdAt);
};
