import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function proxy(request: NextRequest) {
	const response = NextResponse.next();
	const supabase = createMiddlewareClient({ req: request, res: response });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user && request.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!user && request.nextUrl.pathname !== "/") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return response;
}

export const config = {
	matcher: ["/", "/dashboard"],
};
