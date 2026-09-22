import { apiClient } from "@/src/utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinkEditableDto } from "project8_nextjs/types";
import { useLinksQueriesRootKey } from "./useLinksPaginated";

export const useUpdateLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, link }: { id: number; link: LinkEditableDto }) => {
			console.log("Updating link", link);
			const { data, error } = await apiClient.api.links({ id }).put(link);

			if (error) throw error;
			return data;
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
			const { error } = await apiClient.api.links({ id }).delete();
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: useLinksQueriesRootKey() });
		},
	});
};
