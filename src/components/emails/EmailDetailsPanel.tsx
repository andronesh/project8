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
		<div className={`flex h-screen w-full ${props.className}`}>
			{isFetching && (
				<div className="flex h-auto w-full items-center justify-center p-24">
					<LoadingSpinner className="flex w-3/4 justify-around" />
				</div>
			)}
			{!isFetching && emailDetails && (
				<div className="w-full p-4">
					<h2 className="mb-2 font-bold">{emailDetails.subject}</h2>
					<iframe srcDoc={emailDetails.body} className="h-full w-full"></iframe>
				</div>
			)}
		</div>
	);
}
