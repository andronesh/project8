import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useIssuesByProject(projectId: number) {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["issues", { projectId }],
		queryFn: async () => {
			const response = await apiClient.api.issues.$get({
				query: { projectId: String(projectId) },
			});

			if (!response.ok) {
				console.error("Failed to fetch issues for project with id=" + projectId);
				throw new Error("Failed to fetch issues for project with id=" + projectId);
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

export function useIssuesByProjectSection(projectId: number, sectionId: number | null) {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["issues", { projectId, sectionId }],
		queryFn: async () => {
			const response = await apiClient.api.issues.$get({
				query: { projectId: String(projectId), sectionId: String(sectionId) },
			});

			if (!response.ok) {
				console.error("Failed to fetch issues for section with id=" + sectionId + " in project with id=" + projectId);
				throw new Error("Failed to fetch issues for section with id=" + sectionId + " in project with id=" + projectId);
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

export function useIssuesByParent(parentId: number) {
	const apiClient = useApiClient();

	return useQuery({
		// queryKey: issueChildrenQuery(parentId),
		queryKey: ["issues", { parentId }],
		queryFn: async () => {
			const response = await apiClient.api.issues.$get({ query: { parentId: String(parentId) } });

			if (!response.ok) {
				throw new Error("Failed to fetch children for issue with id=" + parentId);
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
