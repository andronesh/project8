import { apiClient } from "@/clients/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useBookmarkedProjectsQuery = () =>
	useQuery({
		queryKey: ["projects", { bookmarked: true }],
		queryFn: async () => {
			const { data, error } = await apiClient.api.projects.get({
				query: { bookmarked: true },
			});
			if (error) throw error;
			return data;
		},
	});
