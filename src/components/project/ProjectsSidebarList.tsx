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
		<ul className="py-2 space-y-2">
			{isFetching && <LoadingSpinner className="flex justify-around mb-2 h-14" />}
			{isError && <div className="text-white bg-red-700 text-lg p-2 rounded">Failed to fetch projects</div>}
			{!isFetching &&
				!isError &&
				data?.map((project: Project) => (
					<li key={project.id}>
						<Link
							href={`/projects/${project.id}`}
							className={`flex items-center justify-between w-full p-2 transition duration-75 rounded-lg pl-11 group text-white hover:cursor-pointer ${
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
