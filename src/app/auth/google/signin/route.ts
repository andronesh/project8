import { GOOGLE_AUTH_URL } from "@/clients/gmailClient";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.redirect(new URL(GOOGLE_AUTH_URL));
}
