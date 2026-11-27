import { useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readApiResponseErrorMessage } from "../utils";

export type ProjectMutationPayload = {
	name: string;
	bookmarked?: boolean;
};

export type UpdateProjectInput = ProjectMutationPayload & {
	id: number;
};

export function useCreateProjectMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (project: ProjectMutationPayload) => {
			const response = await apiClient.api.projects.$post({
				json: project,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to create project"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}

export function useUpdateProjectMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...project }: UpdateProjectInput) => {
			const response = await apiClient.api.projects[":id"].$put({
				param: { id: String(id) },
				json: project,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to update project"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}
