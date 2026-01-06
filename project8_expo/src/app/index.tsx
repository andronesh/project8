import { ActivityIndicator, Image, Text, View } from "react-native";
import SignInForm from "../components/auth/SignInForm";
import { authClient } from "../utils/authClient";
import { useEffect, useState } from "react";
import { Project } from "project8_nextjs/types";
import { apiClient } from "../utils/apiClient";
import { Button, useToast } from "heroui-native";

export default function Index() {
	const { data: authSession, isPending: authIsPending } = authClient.useSession();
	const [projects, setProjects] = useState<Project[]>([]);

	const { toast } = useToast();

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

	const showToast = async () => {
		toast.show({
			label: "Login failed",
			description: "Please enter both email and password.",
			variant: "danger",
			actionLabel: "Retry",
			onActionPress: ({ hide }) => {
				hide();
			},
		});
	};

	return (
		<View className="bg-background flex-1 p-4">
			<View className="mb-4 flex-row items-center justify-between">
				<Text className="text-lg text-black dark:text-white">{authSession?.user?.email || "Guest"}</Text>
				{authIsPending && (
					<ActivityIndicator size="large" colorClassName="accent-blue-500 dark:accent-blue-400" />
				)}
				{authSession && (
					<Button variant="secondary" size="sm" onPress={() => authClient.signOut()}>
						OUT
					</Button>
				)}
			</View>
			<Image
				source={{
					uri: "https://walter-r2.trakt.tv/images/users/011/839/218/avatars/medium/dc8ededd5c.jpg",
				}}
				className="h-24 w-24 rounded-lg"
			/>
			<Button variant="danger-soft" onPress={showToast} className="m-3">
				Show Toast
			</Button>
			{!authIsPending && !authSession && (
				<View className="my-4 gap-2">
					<SignInForm />
				</View>
			)}
			{projects.map((project) => (
				<View key={project.id} className="mt-2 rounded-lg bg-gray-200 p-4 dark:bg-gray-800">
					<Text className="text-black dark:text-white">{project.name}</Text>
				</View>
			))}
		</View>
	);
}
