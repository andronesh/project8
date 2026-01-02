import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
	.get(
		"/greet/:id",
		({ params: { id } }) => {
			return {
				message: `Hello, ${id}!`,
			};
		},
		{ params: t.Object({ id: t.Number() }) },
	)
	.post("/", ({ body }) => body, {
		body: t.Object({
			name: t.String(),
		}),
	});

export const GET = app.fetch;
export const POST = app.fetch;
