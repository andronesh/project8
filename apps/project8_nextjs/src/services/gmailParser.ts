import { EmailsPageDto, fetchEmails } from "@/clients/gmailClient";
import { useApiClient } from "@project8/api-hooks";
import { EmailDto } from "@project8/api-hooks/types";

export async function fetchAndSaveEmails(googleAccessToken: string) {
	let emailsPageDto: EmailsPageDto | null = null;
	const emails: EmailDto[] = [];

	do {
		console.info("--- fetching page " + emailsPageDto?.nextPageToken);
		emailsPageDto = await fetchEmails(googleAccessToken, emailsPageDto ? emailsPageDto.nextPageToken : undefined);
		for (let i = 0; i < emailsPageDto.messages.length; i++) {
			const email = emailsPageDto.messages[i];
			const existingEmail = await findEmailByGmailId(email.id);
			if (existingEmail.length === 0) {
				emails.push(await saveEmail(email.id));
			}
		}
	} while (emailsPageDto && emailsPageDto.nextPageToken);

	console.info(`--- Saved ${emails.length} emails`);
	return emails;
}

const findEmailByGmailId = async (gmailId: string) => {
	const apiClient = useApiClient();

	const response = await apiClient.api.emails.$get({
		query: { gmailId: String(gmailId) },
	});

	if (!response.ok) {
		console.error("Failed to fetch emails for GmailId=" + gmailId);
		throw new Error("Failed to fetch emails for GmailId=" + gmailId);
	}

	return response.json();
};

const saveEmail = async (gmailId: string) => {
	const apiClient = useApiClient();

	const response = await apiClient.api.emails.$post({
		json: { gmailId },
	});

	if (!response.ok) {
		console.error("Failed to save email for GmailId=" + gmailId);
		throw new Error("Failed to save email for GmailId=" + gmailId);
	}

	return response.json();
};
