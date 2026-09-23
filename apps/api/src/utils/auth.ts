import { db } from "@project8/domain/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
import { bearer } from "better-auth/plugins";
import * as schema from "@project8/domain/schema";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	advanced: {
		database: {
			generateId: false,
		},
	},
	plugins: [expo(), bearer()],
	trustedOrigins: ["project8://", ...ALLOWED_ORIGINS],
});
