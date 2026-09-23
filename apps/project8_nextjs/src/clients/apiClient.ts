import { ServerApp } from "@/api/app";
import { treaty } from "@elysiajs/eden";

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE || "localhost:3000";

export const apiClient: ReturnType<typeof treaty<ServerApp>> = treaty<ServerApp>(appBaseUrl);
