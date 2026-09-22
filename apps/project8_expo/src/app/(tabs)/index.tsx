import { Image, Text, View } from "react-native";
import { authClient } from "../../utils/authClient";
import { useEffect, useState } from "react";
import { Project } from "project8_nextjs/types";
import { apiClient } from "../../utils/apiClient";
import { useToast } from "heroui-native";
import { useRouter } from "expo-router";
import { useShareIntentContext } from "expo-share-intent";

export default function Index() {
	const { data: authSession } = authClient.useSession();
	const [projects, setProjects] = useState<Project[]>([]);

	const { toast } = useToast();

	const router = useRouter();

	const { hasShareIntent } = useShareIntentContext();

	useEffect(() => {
		if (hasShareIntent) {
			router.navigate({
				pathname: "./shareintent",
			});
		}
	}, [hasShareIntent]);

	async function fetchProjects() {
		try {
			const { data, error } = await apiClient.api.projects.get({
				query: { bookmarked: true },
			});
			if (error) {
				toast.show({
					label: "Error fetching projects",
					description: JSON.stringify(error),
					variant: "danger",
					actionLabel: "Retry",
					onActionPress: ({ hide }) => {
						hide();
						fetchProjects();
					},
				});
				console.error("API error:", JSON.stringify(error));
				return;
			}
			setProjects(data);
		} catch (error) {
			toast.show({
				label: "Error fetching projects",
				description: JSON.stringify(error),
				variant: "danger",
				actionLabel: "Retry",
				onActionPress: ({ hide }) => {
					hide();
					fetchProjects();
				},
			});
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
			<Image
				source={{
					uri: "https://walter-r2.trakt.tv/images/users/011/839/218/avatars/medium/dc8ededd5c.jpg",
				}}
				className="h-44 w-44 self-center rounded-lg"
			/>
			{projects.map((project) => (
				<View key={project.id} className="bg-surface mt-2 rounded-lg p-4">
					<Text className="text-foreground">{project.name}</Text>
				</View>
			))}
		</View>
	);
}
