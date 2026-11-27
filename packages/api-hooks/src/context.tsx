import { createContext, useContext, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ApiClient } from "./client";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const ApiHooksContext = createContext<ApiClient | null>(null);

export type ApiHooksProviderProps = {
	apiClient: ApiClient;
	children: ReactNode;
};

export function ApiHooksProvider({ apiClient, children }: ApiHooksProviderProps) {
	return (
		<ApiHooksContext.Provider value={apiClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ApiHooksContext.Provider>
	);
}

export function useApiClient(): ApiClient {
	const client = useContext(ApiHooksContext);
	if (!client) {
		throw new Error("useApiClient must be used inside <ApiHooksContextProvider>");
	}
	return client;
}
