import { apiClient } from "@/src/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useAllLinksPaginatedQueryKey = (limit: number, offset: number) => ["links", limit, offset];

export const useAllLinksPaginatedQuery = (limit: number, offset: number) =>
	useQuery({
		queryKey: useAllLinksPaginatedQueryKey(limit, offset),
		queryFn: async () => {
			const { data, error } = await apiClient.api.links.get({
				query: {
					limit,
					offset,
				},
			});
			if (data) return data;
			if (error) throw error;
		},
	});
