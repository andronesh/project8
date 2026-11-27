import { useApiClient } from "@project8/api-hooks";
import { useQuery } from "@tanstack/react-query";

export function useEmailsPaginatedQuery() {
	const apiClient = useApiClient();

	return useQuery({
		queryKey: ["emails"],
		queryFn: async () => {
			const response = await apiClient.api.emails.$get({ query: {} });

			if (!response.ok) {
				throw new Error("Failed to fetch all emails");
			}

			// TODO: use propper DTO via Honojs InferResponseType
			return (await response.json()).map((email) => ({
				...email,
				createdAt: new Date(email.createdAt),
			}));
		},
	});
}
