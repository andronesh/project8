"use client";

import React from "react";
import { ApiHooksProvider, createApiClient } from "@project8/api-hooks";

const apiBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE ?? "http://localhost:3000";
const apiClient = createApiClient(apiBaseUrl, {
	init: { credentials: "include" },
});

export default function ApiHooksConfiguredProvider({ children }: { children: React.ReactNode }) {
	return <ApiHooksProvider apiClient={apiClient}>{children}</ApiHooksProvider>;
}
