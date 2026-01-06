import "@/src/global.css";

import { Stack } from "expo-router";
import React from "react";
import { useUniwind } from "uniwind";

import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
	const theme = useUniwind().theme;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<HeroUINativeProvider>
				<Stack />
			</HeroUINativeProvider>
		</GestureHandlerRootView>
	);
}
