import { db } from "@/database";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
import * as schema from "@/database/schema";

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
	plugins: [expo()],
	trustedOrigins: ["project8://"],
});
