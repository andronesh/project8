import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useAllProjectsQuery() {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const response = await apiClient.api.projects.$get({ query: {} });

			if (!response.ok) {
				throw new Error("Failed to fetch all projects");
			}

			return response.json();
		},
	});
}
