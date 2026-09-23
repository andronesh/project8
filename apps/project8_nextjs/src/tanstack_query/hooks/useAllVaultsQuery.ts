import { getAllVaults } from "@project8/domain/daos/vaultsDAO";
import { useQuery } from "@tanstack/react-query";

export const useAllVaultsQuery = () =>
	useQuery({
		queryKey: ["vaults"],
		queryFn: async () => await getAllVaults(),
	});
