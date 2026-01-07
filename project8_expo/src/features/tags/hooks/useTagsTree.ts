import { apiClient } from "@/src/utils/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useTagsTreeQueryKey = () => ["tags", "tree"];

export const useTagsTree = () =>
	useQuery({
		queryKey: useTagsTreeQueryKey(),
		queryFn: async () => {
			const { data, error } = await apiClient.api.tags.get();
			if (data) return data;
			if (error) throw error;
		},
	});
