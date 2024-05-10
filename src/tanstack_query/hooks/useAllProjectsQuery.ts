import { getAllProjects } from "@/database/dao/projectsDAO";
import { useQuery } from "@tanstack/react-query";

export const useAllProjectsQuery = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getAllProjects(),
  });
