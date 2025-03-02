"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { EmailDetailsDto, fetchEmailDetails } from "@/clients/gmailClient";
import { useSearchParams } from "next/navigation";

type Props = {
	gmailId: string;
	className?: string;
};

export default function EmailDetailsPanel(props: Props) {
	const [emailDetails, setEmailDetails] = useState<EmailDetailsDto>();
	const [isFetching, setFetching] = useState(false);

	const googleAuthToken = useSearchParams().get("google_auth_token")!;

	useEffect(() => {
		setFetching(true);
		fetchEmailDetails(googleAuthToken, props.gmailId)
			.then((data) => setEmailDetails(data))
			.catch((error) => {
				console.error("Failed to fetch single email details from GMail", error);
				window.alert(error);
			})
			.finally(() => {
				setFetching(false);
			});
	}, [props.gmailId]);

	return (
		<div className={`flex w-full h-screen ${props.className}`}>
			{isFetching && (
				<div className="h-auto w-full p-24 flex items-center justify-center">
					<LoadingSpinner className="flex w-3/4 justify-around" />
				</div>
			)}
			{!isFetching && emailDetails && (
				<div className="p-4 w-full">
					<h2 className="font-bold mb-2">{emailDetails.subject}</h2>
					<iframe srcDoc={emailDetails.body} className="w-full h-full"></iframe>
				</div>
			)}
		</div>
	);
}
