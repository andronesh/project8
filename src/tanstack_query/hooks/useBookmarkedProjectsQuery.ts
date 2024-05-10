import { getBookmarkedProjects } from "@/database/dao/projectsDAO";
import { useQuery } from "@tanstack/react-query";

export const useBookmarkedProjectsQuery = () =>
  useQuery({
    queryKey: ["projects", { bookmarked: true }],
    queryFn: async () => await getBookmarkedProjects(),
  });
