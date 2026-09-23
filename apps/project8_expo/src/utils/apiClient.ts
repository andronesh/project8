import { hc } from "hono/client";

import type { ServerApp } from "@project8/api/app";
import { authClient } from "./authClient";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL_BASE!;

const fetchWithAuth: typeof fetch = async (input, init) => {
	const token = (await authClient.getSession()).data?.session.token;

	const headers = new Headers(init?.headers);

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	return fetch(input, {
		...init,
		headers,
	});
};

export const apiClient = hc<ServerApp>(apiBaseUrl, {
	fetch: fetchWithAuth,
});
