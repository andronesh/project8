import { listEmails } from "@/database/dao/emailsDAO";
import { useQuery } from "@tanstack/react-query";

export const useEmailsPaginatedQuery = () =>
	useQuery({
		queryKey: ["emails"],
		queryFn: async () => await listEmails(),
	});
