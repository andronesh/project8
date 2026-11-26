"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClientProvider, createApiClient } from "@project8/api-hooks";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const apiBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE ?? "http://localhost:3000";
const apiClient = createApiClient(apiBaseUrl, {
	init: { credentials: "include" },
});

export default function TanstackQueryClientProvider({ children }: { children: React.ReactNode }) {
	return (
		<ApiClientProvider client={apiClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ApiClientProvider>
	);
}
