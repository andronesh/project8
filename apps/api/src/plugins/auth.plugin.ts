import { Elysia } from "elysia";
import { auth } from "../utils/auth";

export const authPlugin = new Elysia({ name: "auth" }).macro({
	auth: {
		async resolve({ status, request: { headers } }) {
			const session = await auth.api.getSession({ headers });

			if (!session) {
				return status(401, {
					error: "Unauthorized access",
				});
			}

			return {
				user: session.user,
				session: session.session,
			};
		},
	},
});
