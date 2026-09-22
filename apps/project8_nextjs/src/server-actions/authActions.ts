"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function getAuthedUserId(): Promise<string | undefined> {
	const session = await auth.api.getSession({
		headers: await headers(), // you need to pass the headers object.
	});

	return session?.user?.id;
}
