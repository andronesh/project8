import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./utils/auth";

const protectedPathPrefixes = ["/dashboard", "/projects", "/rescueTiktokLinks", "/gmailParser", "/sync"];

function isProtected(path: string): boolean {
	return protectedPathPrefixes.some((prefix) => {
		return path === prefix || path.startsWith(prefix + "/");
	});
}

export async function proxy(request: NextRequest) {
	const response = NextResponse.next();
	const { pathname } = request.nextUrl;

	if (!isProtected(pathname)) {
		return response;
	}

	try {
		const session = await auth.api.getSession({
			headers: await headers(),
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
	matcher: ["/:path*"],
};
