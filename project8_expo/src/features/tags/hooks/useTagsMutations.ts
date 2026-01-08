import { apiClient } from "@/src/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TagEditableDto } from "project8_nextjs/types";
import { useTagsTreeQueryKey } from "./useTagsTree";

export const useCreateTag = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (tag: TagEditableDto) => {
			const { data, error } = await apiClient.api.tags.post(tag);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useTagsTreeQueryKey() });
		},
	});
};

export const useUpdateTag = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, tag }: { id: number; tag: TagEditableDto }) => {
			const { data, error } = await apiClient.api.tags({ id }).put(tag);
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useTagsTreeQueryKey() });
		},
	});
};

export const useDeleteTag = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const { error } = await apiClient.api.tags({ id }).delete();
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useTagsTreeQueryKey() });
		},
	});
};
