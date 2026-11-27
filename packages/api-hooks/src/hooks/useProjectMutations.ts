import { useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ProjectMutationPayload = {
	name: string;
	bookmarked?: boolean;
};

export type UpdateProjectInput = ProjectMutationPayload & {
	id: number;
};

async function readErrorMessage(response: Response, fallbackMessage: string): Promise<string> {
	try {
		const body: unknown = await response.json();
		if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
			return body.error;
		}
		return `${fallbackMessage} (${response.status}): ${JSON.stringify(body)}`;
	} catch {
		return `${fallbackMessage} (${response.status})`;
	}
}

export function useCreateProjectMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (project: ProjectMutationPayload) => {
			const response = await apiClient.api.projects.$post({
				json: project,
			});

			if (!response.ok) {
				throw new Error(await readErrorMessage(response, "Failed to create project"));
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
				throw new Error(await readErrorMessage(response, "Failed to update project"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
}
