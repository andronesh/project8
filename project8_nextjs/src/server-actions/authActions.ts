"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getAuthedUserId(): Promise<string | undefined> {
	const cookieStore = cookies();
	const supabase = createServerComponentClient({ cookies: () => cookieStore });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return session?.user?.id;
}
