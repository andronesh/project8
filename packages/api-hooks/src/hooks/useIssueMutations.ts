import { type ApiClient, useApiClient } from "@project8/api-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType } from "hono/client";
import { readApiResponseErrorMessage } from "../utils";

export type CreateIssueInput = InferRequestType<ApiClient["api"]["issues"]["$post"]>["json"]; // TODO use this approach for DTOs

export type UpdateIssueInput = InferRequestType<ApiClient["api"]["issues"][":id"]["$put"]>["json"] & {
	id: number;
};

function normalizeIssue<T extends { createdAt: string | Date; updatedAt: string | Date | null }>(issue: T) {
	return {
		...issue,
		createdAt: new Date(issue.createdAt),
		updatedAt: issue.updatedAt ? new Date(issue.updatedAt) : null,
	};
}

function invalidateIssueQueries(queryClient: ReturnType<typeof useQueryClient>) {
	// TODO invalidate only the queries that are affected by the mutation, instead of invalidating all issue-related queries
	return queryClient.invalidateQueries({ queryKey: ["issues"] });
}

export function useCreateIssueMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (issue: CreateIssueInput) => {
			const response = await apiClient.api.issues.$post({
				json: issue,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to create issue"));
			}

			return normalizeIssue(await response.json());
		},
		onSuccess: () => invalidateIssueQueries(queryClient),
	});
}

export function useUpdateIssueMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...issue }: UpdateIssueInput) => {
			const response = await apiClient.api.issues[":id"].$put({
				param: { id: String(id) },
				json: issue,
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to update issue"));
			}

			return normalizeIssue(await response.json());
		},
		onSuccess: () => invalidateIssueQueries(queryClient),
	});
}

export function useDeleteIssueMutation() {
	const apiClient = useApiClient();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const response = await apiClient.api.issues[":id"].$delete({
				param: { id: String(id) },
			});

			if (!response.ok) {
				throw new Error(await readApiResponseErrorMessage(response, "Failed to delete issue"));
			}
		},
		onSuccess: () => invalidateIssueQueries(queryClient),
	});
}
