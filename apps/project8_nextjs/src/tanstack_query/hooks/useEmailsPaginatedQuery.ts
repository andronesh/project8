import { listEmails } from "@project8/domain/daos/emailsDAO";
import { useQuery } from "@tanstack/react-query";

export const useEmailsPaginatedQuery = () =>
	useQuery({
		queryKey: ["emails"],
		queryFn: async () => await listEmails(),
	});
