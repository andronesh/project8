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

			// TODO: use propper DTO via Honojs InferResponseType
			return (await response.json()).map((vault) => ({
				...vault,
				createdAt: new Date(vault.createdAt),
				updatedAt: vault.updatedAt ? new Date(vault.updatedAt) : null,
			}));
		},
	});
}
