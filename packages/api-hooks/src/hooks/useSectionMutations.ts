import { useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readApiResponseErrorMessage } from "../utils";

export type CreateSectionInput = {
	title: string;
	projectId: number;
};

export type UpdateSectionInput = {
	id: number;
	title: string;
};

export function useCreateSectionMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (section: CreateSectionInput) => {
			const response = await apiClient.api.sections.$post({
				json: section,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to create section"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});
}

export function useUpdateSectionMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...section }: UpdateSectionInput) => {
			const response = await apiClient.api.sections[":id"].$put({
				param: { id: String(id) },
				json: section,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to update section"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});
}
