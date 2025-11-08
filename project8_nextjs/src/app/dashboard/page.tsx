import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProjectsPanel from "@/components/project/ProjectsPanel";
import { Suspense } from "react";

export default async function Dashboard() {
	return (
		<Suspense fallback={<LoadingSpinner className="flex h-full justify-around" />}>
			<ProjectsPanel />
		</Suspense>
	);
}
