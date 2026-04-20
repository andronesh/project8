import { ServerApp } from "@/app/api/[[...slug]]/route";
import { treaty } from "@elysiajs/eden";

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE || "localhost:3000";

export const apiClient = treaty<ServerApp>(appBaseUrl);
