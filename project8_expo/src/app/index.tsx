import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import SignInForm from "../components/auth/SignInForm";
import { authClient } from "../utils/authClient";
import { useEffect, useState } from "react";
import { Project } from "project8_nextjs/types";
import { apiClient } from "../utils/apiClient";

export default function Index() {
	const { data: authSession, isPending: authIsPending } = authClient.useSession();
	const [projects, setProjects] = useState<Project[]>([]);

	async function fetchProjects() {
		try {
			const { data, error } = await apiClient.api.projects.get({
				query: { bookmarked: true },
			});
			if (error) {
				console.error("API error:", JSON.stringify(error));
				return;
			}
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	}

	useEffect(() => {
		if (authSession) {
			fetchProjects();
		}
	}, [authSession]);

	return (
		<View className="flex-1 p-4">
			<View className="mb-4 flex-row items-center justify-between">
				<Text className="text-lg text-black dark:text-white">{authSession?.user?.email || "Guest"}</Text>
				{authIsPending && (
					<ActivityIndicator size="large" colorClassName="accent-blue-500 dark:accent-blue-400" />
				)}
				{authSession && (
					<Button
						title="out"
						colorClassName="accent-amber-500 dark:accent-amber-400"
						onPress={() => authClient.signOut()}
					/>
				)}
			</View>
			<Image
				source={{
					uri: "https://walter-r2.trakt.tv/images/users/011/839/218/avatars/medium/dc8ededd5c.jpg",
				}}
				className="h-24 w-24 rounded-lg"
			/>
			{!authIsPending && !authSession && (
				<View className="my-4 gap-2">
					<SignInForm />
				</View>
			)}
			{projects.map((project) => (
				<View key={project.id} className="mb-2 rounded-lg bg-gray-200 p-4 dark:bg-gray-800">
					<Text className="text-black dark:text-white">{project.name}</Text>
				</View>
			))}
		</View>
	);
}
