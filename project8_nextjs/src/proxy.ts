import { NextRequest, NextResponse } from "next/server";
import { auth } from "./utils/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
	const response = NextResponse.next();
	try {
		const session = await auth.api.getSession({
			headers: await headers(), // you need to pass the headers object.
		});

		if (session && request.nextUrl.pathname === "/") {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}

		if (!session && request.nextUrl.pathname !== "/") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} catch (error) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return response;
}

export const config = {
	matcher: [
		"/",
		"/dashboard/:path*",
		"/projects/:path*",
		"/rescueTiktokLinks/:path*",
		"/gmailParser/:path*",
		"/sync/:path*",
		"/auth/signout/:path*",
	],
};
