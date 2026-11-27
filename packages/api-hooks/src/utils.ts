export async function readApiResponseErrorMessage(response: Response, fallbackMessage: string): Promise<string> {
	try {
		const body: unknown = await response.json();
		if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
			return body.error;
		}
		return `${fallbackMessage} (${response.status}): ${JSON.stringify(body)}`;
	} catch {
		return `${fallbackMessage} (${response.status})`;
	}
}
