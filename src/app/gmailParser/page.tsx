import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmailsPanel from "@/components/emails/EmailsPanel";
import { Suspense } from "react";

export default async function GMailParserPage() {
	return (
		<Suspense fallback={<LoadingSpinner className="flex w-full justify-around px-16 py-8" />}>
			<EmailsPanel />
		</Suspense>
	);
}
