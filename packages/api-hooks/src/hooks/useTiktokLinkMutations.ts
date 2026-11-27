import { useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readApiResponseErrorMessage } from "../utils";

export type TiktokLinkCreateInput = {
	url?: string;
	thumbnail?: string | null;
	isRecipe?: boolean;
	descriptionImage?: string | null;
	tgSavedAt?: string | null;
};

export function useCreateTiktokLinkMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (link: TiktokLinkCreateInput) => {
			const response = await apiClient.api.tiktok.links.$post({
				json: link,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to create TikTok link"));
			}

			return response.json();
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({ queryKey: ["tiktokLinks"] });
		},
	});
}
