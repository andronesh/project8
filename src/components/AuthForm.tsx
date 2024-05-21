"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {
	appBaseUrl?: string;
};

export default function AuthForm({ appBaseUrl }: Props) {
	const supabase = createClientComponentClient();

	return (
		<Auth
			supabaseClient={supabase}
			view="magic_link"
			showLinks={false}
			providers={[]}
			redirectTo={appBaseUrl + "/auth/callback"}
			appearance={{
				className: {
					button: "bg-white-400 text-gray-900 hover:bg-gray-600",
					input: "bg-gray-700 border-gray-600 text-white",
				},
			}}
		/>
	);
}
