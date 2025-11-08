import { getIssueChildren } from "@/database/dao/issuesDAO";
import { useQuery } from "@tanstack/react-query";
import { issueChildrenQuery } from "../keys";

export const useIssueChildren = (parentId: number) =>
	useQuery({
		queryKey: issueChildrenQuery(parentId),
		queryFn: async () => await getIssueChildren(parentId),
	});
