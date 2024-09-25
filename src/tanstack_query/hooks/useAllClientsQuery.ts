import { getAllClients } from "@/database/dao/clientsDAO";
import { useQuery } from "@tanstack/react-query";

export const useAllClientsQuery = () =>
	useQuery({
		queryKey: ["clients"],
		queryFn: async () => await getAllClients(),
	});
