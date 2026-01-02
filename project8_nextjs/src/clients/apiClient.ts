import { treaty } from "@elysiajs/eden";
import { ServerApp } from "@/app/api/[[...slugs]]/route";

const appBaseUrl = process.env.APP_URL_BASE || "localhost:3000";

export const apiClient = treaty<ServerApp>(appBaseUrl);
