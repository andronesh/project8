"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoogleAuthRedirectPage() {
	const [error, setError] = useState<string>();
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash;
			const google_auth_token = hash
				.replace("#", "")
				.split("&")
				.find((param) => param.startsWith("access_token"))
				?.replace("access_token=", "");
			if (google_auth_token) {
				redirect("/gmailParser?google_auth_token=" + google_auth_token); // TODO store token in some state
			} else {
				setError("Failed to parse access code from URL hash");
			}
		} else {
			setError("Failed to parse access code from URL hash");
		}
	}, [router]);

	if (error) {
		return <div className="rounded-sm bg-red-700 p-2 text-lg text-white">{error}</div>;
	}

	return (
		<div>
			<div className="bg-opacity-80 bg-card absolute top-0 right-0 bottom-2 left-0 flex items-center justify-center rounded-lg">
				<LoadingSpinner className="flex w-3/4 justify-around" />
			</div>
		</div>
	);
}
