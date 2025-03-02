export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&response_type=token&redirect_uri=${process.env.OAUTH2_GOOGLE_REDIRECT_URL}&client_id=${process.env.OAUTH2_GOOGLE_CLIENT_ID}&scope=https://mail.google.com`;

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
