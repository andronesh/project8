import { Text, View, Image } from "react-native";
import SignInForm from "../../features/auth/SignInForm";
import { authClient } from "../../utils/authClient";
import { Button, useToast } from "heroui-native";

export default function SettingsScreen() {
	const { data: authSession, isPending: authIsPending } = authClient.useSession();
	const { toast } = useToast();

	const showToastDanger = async () => {
		toast.show({
			label: "Testing toasting",
			description:
				"API Routes are functions that are executed on a server when a route is matched. They can be used to handle sensitive data",
			variant: "danger",
			actionLabel: "Hide",
			onActionPress: ({ hide }) => {
				hide();
			},
		});
	};

	const showToastSuccess = async () => {
		toast.show({
			label: "Testing toasting",
			description:
				"API Routes are functions that are executed on a server when a route is matched. They can be used to handle sensitive data",
			variant: "success",
		});
	};

	return (
		<View className="flex-1 gap-4 p-4">
			<View className="flex-row justify-around">
				<Button variant="danger-soft" onPress={showToastDanger}>
					Test Toast
				</Button>
				<Button variant="secondary" onPress={showToastSuccess}>
					Test Toast
				</Button>
			</View>
			<Image
				source={{
					uri: "https://walter-r2.trakt.tv/images/users/011/839/218/avatars/medium/dc8ededd5c.jpg",
				}}
				className="h-44 w-44 self-center rounded-lg"
			/>
			{authSession && (
				<View className="flex-row items-center justify-between">
					<Text className="text-foreground text-lg">{authSession?.user?.email}</Text>
					<Button variant="secondary" size="sm" onPress={() => authClient.signOut()}>
						OUT
					</Button>
				</View>
			)}

			{!authSession && <SignInForm />}
		</View>
	);
}
