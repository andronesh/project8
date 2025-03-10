"use client";

import { useEffect, useState } from "react";
import { fetchProfile } from "@/clients/gmailClient";
import { useSearchParams } from "next/navigation";

export default function GoogleAuthStatus() {
	const [profileEmail, setProfileEmail] = useState<string>();
	const searchParams = useSearchParams();
	const googleAuthToken = searchParams.get("google_auth_token")!;

	const fetchProfileEmail = () => {
		fetchProfile(googleAuthToken)
			.then(setProfileEmail)
			.catch((error) => {
				console.error("Failed to fetch profile email", error);
			});
	};

	useEffect(() => {
		fetchProfileEmail();
	}, []);

	if (profileEmail) {
		return (
			<a className="mb-2 flex items-center justify-center rounded-lg px-2 pb-1 pt-2 align-middle text-gray-500">
				logged as <span className="ml-1 font-bold">{profileEmail.replace("@gmail.com", "")}</span>
			</a>
		);
	}

	return (
		<a
			className="mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-2 pb-1 pt-2 align-middle text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
			href="/auth/google/signin"
		>
			auth
		</a>
	);
}
