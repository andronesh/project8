"use client";

import { Project } from "@/server-actions/projectsActions";
import { useBookmarkedProjectsQuery } from "@/tanstack_query/hooks/useBookmarkedProjectsQuery";
import Link from "next/link";
import LoadingSpinner from "../common/LoadingSpinner";
import { useProjectIdFromPath } from "@/hooks/useProjectIdFromPath";

export default function ProjectsSidebarList() {
	const selectedProjectId = useProjectIdFromPath();
	const { data, isFetching, isError } = useBookmarkedProjectsQuery();

	return (
		<ul className="space-y-2 py-2">
			{isFetching && <LoadingSpinner className="mb-2 flex h-14 justify-around" />}
			{isError && <div className="rounded-sm bg-red-700 p-2 text-lg text-white">Failed to fetch projects</div>}
			{!isFetching &&
				!isError &&
				data?.map((project: Project) => (
					<li key={project.id}>
						<Link
							href={`/projects/${project.id}`}
							className={`group flex w-full items-center justify-between rounded-lg p-2 pl-11 text-white transition duration-75 hover:cursor-pointer ${
								selectedProjectId === project.id
									? "bg-blue-900 hover:bg-blue-900"
									: "bg-gray-800 hover:bg-gray-700"
							}`}
						>
							<h2>{project.name}</h2>
						</Link>
					</li>
				))}
		</ul>
	);
}
