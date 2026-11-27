import { useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readApiResponseErrorMessage } from "../utils";

export type VaultMutationPayload = {
	name: string;
	token: string;
	url?: string | null;
};

export type UpdateVaultInput = VaultMutationPayload & {
	id: number;
};

export function useCreateVaultMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (vault: VaultMutationPayload) => {
			const response = await apiClient.api.vaults.$post({
				json: vault,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to create vault"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["vaults"] });
		},
	});
}

export function useUpdateVaultMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...vault }: UpdateVaultInput) => {
			const response = await apiClient.api.vaults[":id"].$put({
				param: { id: String(id) },
				json: vault,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to update vault"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["vaults"] });
		},
	});
}
