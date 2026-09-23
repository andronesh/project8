import { apiClient } from "@/src/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useTagsTreeQueryKey = () => ["tags", "tree"];

export const useTagsTree = () =>
	useQuery({
		queryKey: useTagsTreeQueryKey(),
		queryFn: async () => {
			const response = await apiClient.api.tags.$get({ query: {} });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to fetch tags (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
			return response.json();
		},
	});
