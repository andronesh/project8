import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useAllVaultsQuery() {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["vaults"],
		queryFn: async () => {
			const response = await apiClient.api.vaults.$get({ query: {} });

			if (!response.ok) {
				throw new Error("Failed to fetch all vaults");
			}

			return response.json();
		},
	});
}
