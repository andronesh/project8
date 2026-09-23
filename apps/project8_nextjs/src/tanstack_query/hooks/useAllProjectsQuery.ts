import { getAllProjects } from "@project8/domain/daos/projectsDAO";
import { useQuery } from "@tanstack/react-query";

export const useAllProjectsQuery = () =>
	useQuery({
		queryKey: ["projects"],
		queryFn: async () => await getAllProjects(),
	});
