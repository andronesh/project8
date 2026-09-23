import { createMiddleware } from "hono/factory";
import { auth } from "../utils/auth";

type AuthVariables = {
	user: NonNullable<Awaited<ReturnType<typeof getSession>>>["user"];
	session: NonNullable<Awaited<ReturnType<typeof getSession>>>["session"];
};

async function getSession(headers: Headers) {
	return auth.api.getSession({
		headers,
	});
}

export const authMiddleware = createMiddleware<{
	Variables: AuthVariables;
}>(async (c, next) => {
	const session = await getSession(c.req.raw.headers);

	if (!session) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	c.set("user", session.user);
	c.set("session", session.session);

	await next();
});
