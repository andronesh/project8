"use client";

import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { useEmailsPaginatedQuery } from "@/tanstack_query/hooks/useEmailsPaginatedQuery";
import { EmailEntity } from "@/database/schema";
import EmailDetailsPanel from "./EmailDetailsPanel";
import { useSearchParams } from "next/navigation";
import GoogleAuthStatus from "./GoogleAuthStatus";
import { fetchAndSaveEmails } from "@/services/gmailParser";
import { useQueryClient } from "@tanstack/react-query";
import DownloadFromCloudIcon from "../common/icons/DownloadFromCloudIcon";

export default function EmailsPanel() {
	const googleAuthToken = useSearchParams().get("google_auth_token")!;

	const [isActionInProgress, setActionInProgress] = useState(false);
	const [selectedEmail, selectEmail] = useState<EmailEntity>();

	const queryClient = useQueryClient();
	const { data: emails, isFetching, isError } = useEmailsPaginatedQuery();

	if (isError) {
		return <div className="rounded bg-red-700 p-2 text-lg text-white">Failed to fetch emails</div>;
	}

	const fetchEmailsFromGmail = () => {
		setActionInProgress(true);
		fetchAndSaveEmails(googleAuthToken)
			.then((emails) => {
				queryClient.invalidateQueries({
					queryKey: ["emails"],
				});
			})
			.catch((error) => {
				console.error("Failed to fetch emails", error);
				window.alert(error);
			})
			.finally(() => setActionInProgress(false));
	};

	return (
		<div className="flex">
			<div className="flex w-1/3 flex-col">
				<GoogleAuthStatus />
				<div className="flex flex-row justify-around">
					<div
						className="mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-2 pb-1 pt-1 align-middle text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
						onClick={() => fetchEmailsFromGmail()}
					>
						<DownloadFromCloudIcon />
						<p className="pl-2 text-lg">page</p>
					</div>
					<div
						className="mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-2 pb-1 pt-1 align-middle text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
						onClick={() => console.info("//TODO: implement")}
					>
						<DownloadFromCloudIcon />
						<p className="pl-2 text-lg">details</p>
					</div>
				</div>
				{(isFetching || isActionInProgress) && (
					<LoadingSpinner className="flex w-full px-16 py-8 justify-around" />
				)}
				<ul className="relative">
					{emails && (
						<div className="flex flex-col px-2 py-3">
							<h3>Results: {emails.length}</h3>
						</div>
					)}
					{emails?.map((email: EmailEntity) => (
						<li key={email.id} className="mb-2">
							<div
								className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-white transition duration-75 hover:cursor-pointer ${
									selectedEmail?.id === email.id
										? "bg-blue-900 hover:bg-blue-900"
										: "bg-gray-800 hover:bg-gray-700"
								}`}
								onClick={() => selectEmail(email)}
							>
								<h2>{email.subject ? email.subject : email.gmailId}</h2>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className="flex w-2/3 flex-col">
				{selectedEmail && <EmailDetailsPanel gmailId={selectedEmail.gmailId} />}
			</div>
		</div>
	);
}
