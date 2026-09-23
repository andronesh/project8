import { EmailsPageDto, fetchEmails } from "@/clients/gmailClient";
import { findByGmailId, insertEmail } from "@project8/domain/daos/emailsDAO";
import { EmailEntity } from "@project8/domain/schema";

export async function fetchAndSaveEmails(googleAccessToken: string) {
	let emailsPageDto: EmailsPageDto | null = null;
	const emails: EmailEntity[] = [];

	do {
		console.info("--- fetching page " + emailsPageDto?.nextPageToken);
		emailsPageDto = await fetchEmails(googleAccessToken, emailsPageDto ? emailsPageDto.nextPageToken : undefined);
		for (let i = 0; i < emailsPageDto.messages.length; i++) {
			const email = emailsPageDto.messages[i];
			const existingEmail = await findByGmailId(email.id);
			if (!existingEmail) {
				emails.push(await insertEmail(email.id));
			}
		}
	} while (emailsPageDto && emailsPageDto.nextPageToken);

	console.info(`--- Saved ${emails.length} emails`);
	return emails;
}
