import { apiClient } from "@/src/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinkEditableDto } from "@project8/domain/types";
import { useLinksQueriesRootKey } from "./useLinksPaginated";

export const useUpdateLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, link }: { id: number; link: LinkEditableDto }) => {
			console.log("Updating link", link);
			const response = await apiClient.api.links[":id"].$put({ param: { id: String(id) }, json: link });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to update link (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useLinksQueriesRootKey() });
		},
	});
};

export const useDeleteLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await apiClient.api.links[":id"].$delete({ param: { id: String(id) } });
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Failed to delete link (${response.status}): ${JSON.stringify(error)}`); // TODO: properly handle
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useLinksQueriesRootKey() });
		},
	});
};
