import { getAllVaults } from "@/database/dao/vaultsDAO";
import { useQuery } from "@tanstack/react-query";

export const useAllVaultsQuery = () =>
	useQuery({
		queryKey: ["vaults"],
		queryFn: async () => await getAllVaults(),
	});
