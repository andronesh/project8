import ClientsPanel from "@/components/clients/ClientsPanel";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Suspense } from "react";

export default async function Dashboard() {
	return (
		<Suspense fallback={<LoadingSpinner className="flex h-full justify-around" />}>
			<ClientsPanel />
		</Suspense>
	);
}
