import "@/src/global.css";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { useUniwind } from "uniwind";

export default function RootLayout() {
	const theme = useUniwind().theme;

	return (
		<ThemeProvider value={theme === "light" ? DefaultTheme : DarkTheme}>
			<Stack />
		</ThemeProvider>
	);
}
