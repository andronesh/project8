import { treaty } from "@elysiajs/eden";
import { ServerApp } from "project8_nextjs/api";
import { authClient } from "./authClient";

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL_BASE!;

export const apiClient = treaty<ServerApp>(apiBaseUrl, {
	// headers: {
	// 	Authorization:
	// 		"Bearer " + (await authClient.getSession()).data?.session.token,
	// },
	fetcher: async (url, init) => {
		const token = (await authClient.getSession()).data?.session.token;

		return fetch(url, {
			...init,
			headers: {
				...init?.headers,
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});
	},
});
