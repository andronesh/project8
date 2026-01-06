import { treaty } from "@elysiajs/eden";
import { ServerApp } from "@/app/api/[[...slugs]]/route";

const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL_BASE || "localhost:3000";

export const apiClient = treaty<ServerApp>(appBaseUrl);
