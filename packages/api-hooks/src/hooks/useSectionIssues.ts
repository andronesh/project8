import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useSectionIssues(projectId: number, sectionId: number | null) {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["sectionIssues", projectId, sectionId],
		queryFn: async () => {
			const response = await apiClient.api.issues.$get({
				query: { projectId: String(projectId), sectionId: String(sectionId) },
			});

			if (!response.ok) {
				console.error("Failed to fetch issues for section with id=" + sectionId + " in project with id=" + projectId);
				throw new Error("Failed to fetch issues for section");
			}

			// TODO: use propper DTO via Honojs InferResponseType
			return (await response.json()).map((issue) => ({
				...issue,
				createdAt: new Date(issue.createdAt),
				updatedAt: issue.updatedAt ? new Date(issue.updatedAt) : null,
			}));
		},
	});
}
