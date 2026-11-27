import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useBookmarkedProjectsQuery() {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["projects", { bookmarked: true }],
		queryFn: async () => {
			const response = await apiClient.api.projects.$get({
				query: {
					bookmarked: "true",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch bookmarked projects");
			}

			return response.json();
		},
	});
}
