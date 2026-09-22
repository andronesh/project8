"use server";

import { db } from "..";
import { EmailEntity, emails } from "../schema";
import { eq } from "drizzle-orm";

export async function insertEmail(
	gmailId: string,
	from?: string,
	subject?: string,
	body?: string,
	internalDate?: number,
): Promise<EmailEntity> {
	const result = await db
		.insert(emails)
		.values({
			gmailId,
			from: from ? from : null,
			subject: subject ? subject : null,
			body: body ? body : null,
			internalDate: internalDate ? internalDate : null,
		})
		.returning();
	return result[0];
}

export async function findByGmailId(gmailId: string) {
	const result = await db
		.select({ id: emails.id, subject: emails.subject, gmailId: emails.gmailId })
		.from(emails)
		.where(eq(emails.gmailId, gmailId));

	return result.length > 0 ? result[0] : undefined;
}

export const listEmails = async (): Promise<EmailEntity[]> => {
	return await db.select().from(emails);
};
