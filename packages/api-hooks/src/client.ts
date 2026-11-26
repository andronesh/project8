import type { ServerApp } from "@project8/api/app";
import { hc, type ClientRequestOptions } from "hono/client";

export function createApiClient(baseUrl: string, options?: ClientRequestOptions) {
	return hc<ServerApp>(baseUrl, options);
}

export type ApiClient = ReturnType<typeof createApiClient>;
