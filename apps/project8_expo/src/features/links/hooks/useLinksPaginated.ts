import { apiClient } from "@/src/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useLinksQueriesRootKey = () => ["links"];

export const useAllLinksPaginatedQueryKey = (limit: number, offset: number) => ["links", limit, offset];

export const useAllLinksPaginatedQuery = (limit: number, offset: number) =>
	useQuery({
		queryKey: useAllLinksPaginatedQueryKey(limit, offset),
		queryFn: async () => {
			const response = await apiClient.api.links.$get({ query: { limit: String(limit), offset: String(offset) } });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to fetch links (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
			return response.json();
		},
	});
