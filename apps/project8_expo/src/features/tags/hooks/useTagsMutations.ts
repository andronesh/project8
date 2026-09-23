import { apiClient } from "@/src/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TagEditableDto } from "@project8/domain/types";
import { useTagsTreeQueryKey } from "./useTagsTree";

export const useCreateTag = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (tag: TagEditableDto) => {
			const response = await apiClient.api.tags.$post({ json: tag });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to create tag (${response.status}): ${JSON.stringify(error)}`); // TODO properly handle
			}
			return response.json();
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
			const response = await apiClient.api.tags[":id"].$put({ param: { id: String(id) }, json: tag });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to update tag (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
			return response.json();
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
			const response = await apiClient.api.tags[":id"].$delete({ param: { id: String(id) } });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to delete tag (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
			return;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useTagsTreeQueryKey() });
		},
	});
};
