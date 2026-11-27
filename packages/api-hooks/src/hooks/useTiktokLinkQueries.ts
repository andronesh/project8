import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@project8/api-hooks";

export function useFilteredTiktokLinks(recipesOnly: boolean) {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["tiktokLinks", { recipesOnly }],
		queryFn: async () => {
			const response = await apiClient.api.tiktok.links.$get({ query: { recipes: String(recipesOnly) } });

			if (!response.ok) {
				throw new Error("Failed to fetch tiktok links, recipes=" + recipesOnly);
			}

			return response.json();
		},
	});
}
