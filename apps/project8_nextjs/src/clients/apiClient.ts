import type { ServerApp } from "@project8/api/app";
import { hc } from "hono/client";

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE ?? "http://localhost:3000";

export const apiClient = hc<ServerApp>(appBaseUrl);
