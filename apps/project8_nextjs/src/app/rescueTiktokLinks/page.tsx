import LoadingSpinner from "@/components/common/LoadingSpinner";
import LinksPanel from "@/components/rescueTiktokLinks/LinksPanel";
import { Suspense } from "react";

export default async function LinksPage() {
	return (
		// TODO when suspense below is used then loading indicator inside LinksPanel isn't shown
		// <Suspense fallback={<LoadingSpinner className="px-20 my-5" />}>
		<LinksPanel />
		// </Suspense>
	);
}
