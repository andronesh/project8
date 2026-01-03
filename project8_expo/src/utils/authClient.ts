import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

const authBaseURL = process.env.EXPO_PUBLIC_API_URL_BASE;

if (!authBaseURL) {
	throw new Error("EXPO_PUBLIC_API_URL_BASE is not set");
}

export const authClient = createAuthClient({
	baseURL: authBaseURL,
	plugins: [
		expoClient({
			scheme: "project8",
			storagePrefix: "project8_auth_",
			storage: SecureStore,
		}),
	],
});
