import { useQuery } from "@tanstack/react-query";
import { issueChildrenQuery } from "../keys";
import { useApiClient } from "@project8/api-hooks";

export function useIssueChildren(parentId: number) {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: issueChildrenQuery(parentId),
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
