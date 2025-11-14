import { authClient } from "@/utils/authClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const response = await authClient.signOut(); // FIXME: throws TypeError: Failed to parse URL from /api/auth/sign-out
		console.log("Sign out response:");
		console.log(JSON.stringify(response));
	} catch (error) {
		console.error("Error during sign out:", error);
	}

	return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}
