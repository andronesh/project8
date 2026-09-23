import { getIssuesForProjectSection } from "@project8/domain/daos/issuesDAO";
import { useQuery } from "@tanstack/react-query";

export const useSectionIssues = (projectId: number, sectionId: number | null) =>
	useQuery({
		queryKey: ["sectionIssues", projectId, sectionId],
		queryFn: async () => await getIssuesForProjectSection(projectId, sectionId),
	});
