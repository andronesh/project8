import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
	schema: "./src/database/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		database: process.env.DATABASE_NAME!,
		port: +process.env.DATABASE_PORT!,
		host: process.env.DATABASE_HOST!,
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASS!,
	},
	schemaFilter: ["public"],
} satisfies Config;
