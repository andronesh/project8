import "@/src/global.css";

import { Stack } from "expo-router";
import React from "react";

import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@react-navigation/native";
import { ShareIntentProvider } from "expo-share-intent";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import TanstackQueryClientProvider from "../utils/TanstackQueryClientProvider";
import { UniwindDarkTheme, UniwindLightTheme } from "../utils/theming";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ShareIntentProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<TanstackQueryClientProvider>
					<HeroUINativeProvider>
						<ThemeProvider value={colorScheme === "light" ? UniwindLightTheme : UniwindDarkTheme}>
							<Stack>
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							</Stack>
						</ThemeProvider>
						<StatusBar style="auto" />
					</HeroUINativeProvider>
				</TanstackQueryClientProvider>
			</GestureHandlerRootView>
		</ShareIntentProvider>
	);
}
