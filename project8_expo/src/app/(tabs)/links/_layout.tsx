import "@/src/global.css";

import { Stack } from "expo-router";
import React from "react";

export default function LinksLayout() {
	return <Stack screenOptions={{ headerShown: false }} />;
}
