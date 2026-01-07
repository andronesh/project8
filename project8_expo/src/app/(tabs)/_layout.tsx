import { Tabs } from "expo-router";
import React from "react";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useThemeColor } from "heroui-native";

export default function BottomTabsLayout() {
	const themeColorBackground = useThemeColor("background");
	const themeColorForeground = useThemeColor("foreground");
	const themeColorAccent = useThemeColor("accent");

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
				}}
			/>
		</Tabs>
	);
}
