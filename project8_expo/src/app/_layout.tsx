import "@/src/global.css";

import { Stack, useRouter } from "expo-router";
import React from "react";

import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ShareIntentProvider } from "expo-share-intent";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
	const router = useRouter();

	return (
		<ShareIntentProvider
			options={{
				resetOnBackground: true,
				onResetShareIntent: () => {
					if (router.canGoBack()) {
						router.back();
					}
				},
			}}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<HeroUINativeProvider>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
					<StatusBar style="auto" />
				</HeroUINativeProvider>
			</GestureHandlerRootView>
		</ShareIntentProvider>
	);
}
