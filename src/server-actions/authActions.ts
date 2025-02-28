"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 } from "uuid";

export async function getAuthedUserId(): Promise<string | undefined> {
	return v4();
	// const cookieStore = cookies();
	// const supabase = createServerComponentClient({ cookies: () => cookieStore });

	// const {
	// 	data: { session },
	// } = await supabase.auth.getSession();

	// return session?.user?.id;
}
