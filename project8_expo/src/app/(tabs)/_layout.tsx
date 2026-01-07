import { Tabs } from "expo-router";
import React from "react";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useThemeColor } from "heroui-native";
import { authClient } from "@/src/utils/authClient";

export default function BottomTabsLayout() {
	const themeColorBackground = useThemeColor("background");
	const themeColorForeground = useThemeColor("foreground");
	const themeColorAccent = useThemeColor("accent");
	const themeColorWarning = useThemeColor("warning");
	const themeColorDanger = useThemeColor("danger");

	const { data: authSession, isPending: authIsPending } = authClient.useSession();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: themeColorAccent,
				tabBarInactiveTintColor: themeColorForeground,
				tabBarStyle: {
					backgroundColor: themeColorBackground,
					// Android
					elevation: 0,
					// iOS
					shadowColor: "transparent",
					shadowOpacity: 0,
					// remove hairline border top
					borderTopWidth: 0,
				},
				headerStyle: { backgroundColor: themeColorBackground },
				headerTintColor: themeColorForeground,
				headerShadowVisible: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <MaterialDesignIcons name="home" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="tags"
				options={{
					title: "Tags",
					tabBarIcon: ({ color }) => <MaterialDesignIcons name="tag-multiple" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => <MaterialDesignIcons name="cog" size={24} color={color} />,
					tabBarBadge: authSession ? undefined : "!",
					tabBarBadgeStyle: {
						backgroundColor: authIsPending ? themeColorWarning : themeColorDanger,
					},
				}}
			/>
		</Tabs>
	);
}
