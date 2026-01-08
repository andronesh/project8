import { authClient } from "@/src/utils/authClient";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Tabs } from "expo-router";
import { useThemeColor } from "heroui-native";
import React from "react";

export default function BottomTabsLayout() {
	const themeColorWarning = useThemeColor("warning");
	const themeColorDanger = useThemeColor("danger");

	const { data: authSession, isPending: authIsPending } = authClient.useSession();

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					// Android
					elevation: 0,
					// iOS
					shadowColor: "transparent",
					shadowOpacity: 0,
					// remove hairline border top
					borderTopWidth: 0,
				},
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
