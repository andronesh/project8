import { fromBase64 } from "@/utils/base64ecoder";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&response_type=token&redirect_uri=${process.env.OAUTH2_GOOGLE_REDIRECT_URL}&client_id=${process.env.OAUTH2_GOOGLE_CLIENT_ID}&scope=https://mail.google.com`;

export type EmailsPageDto = {
	messages: EmailShortDto[];
	nextPageToken: string;
	resultSizeEstimate: number;
};

export type EmailShortDto = {
	id: string;
	threadId: string;
};

export type EmailDetailsDto = {
	id: string;
	date: string;
	from: string;
	subject: string;
	body: string;
};

export async function fetchProfile(googleOAuthToken: string): Promise<string> {
	const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/profile`, {
		headers: {
			Authorization: `Bearer ${googleOAuthToken}`,
		},
	});

	if (!response.ok) {
		console.error(`Failed to fetch GMail profile: ${response.text()}`, response);
		throw new Error(response.statusText);
	}

	return (await response.json()).emailAddress;
}

export async function fetchEmails(googleOAuthToken: string, pageToken?: string): Promise<EmailsPageDto> {
	const pageTokenParam = pageToken ? `&pageToken=${pageToken}` : "";

	const response = await fetch(
		`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=from:*@domigr.com.ua${pageTokenParam}`,
		{
			headers: {
				Authorization: `Bearer ${googleOAuthToken}`,
			},
		},
	);

	if (!response.ok) {
		console.error(`Failed to fetch emails: ${response.text()}`, response);
		throw new Error(response.statusText);
	}

	return (await response.json()) as EmailsPageDto;
}

type EmailHeader = {
	name: string;
	value: string;
};

type EmailPart = {
	partId: string;
	mimeType: string;
	filename: string;
	headers: EmailHeader[];
	body: {
		size: number;
		data: string;
	};
};

export async function fetchEmailDetails(googleOAuthToken: string, gmailId: string): Promise<EmailDetailsDto> {
	const response = await fetch(
		`https://gmail.googleapis.com/gmail/v1/users/me/messages/${gmailId}?format=full`,
		{
			headers: {
				Authorization: `Bearer ${googleOAuthToken}`,
			},
		},
	);

	if (!response.ok) {
		console.error(`Failed to fetch emails: ${response.text()}`, response);
		throw new Error(response.statusText);
	}

	const data = (await response.json()).payload;
	const emailHeaders = data.headers as EmailHeader[];
	const date = emailHeaders.find((header) => header.name === "Date")?.value;
	const from = emailHeaders.find((header) => header.name === "From")?.value;
	const subject = emailHeaders.find((header) => header.name === "Subject")?.value;
	const body = (data.parts[0].parts as EmailPart[]).find((part) => part.mimeType === "text/html")?.body.data;

	return {
		id: gmailId,
		date: date ? date : "",
		from: from ? from : "",
		subject: subject ? subject : "",
		body: body ? fromBase64(body) : "",
	};
}
