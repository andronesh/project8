import { Button, Image, Text, View } from "react-native";
import SignInForm from "../components/auth/SignInForm";
import { authClient } from "../utils/authClient";

export default function Index() {
	const { data: authSession } = authClient.useSession();

	return (
		<View className="flex-1 p-4">
			<View className="flex-row justify-between items-center mb-4">
				<Text className="text-lg text-black dark:text-white">
					{authSession?.user?.email || "Guest"}
				</Text>
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
				className="w-24 h-24 rounded-lg"
			/>
			{!authSession && (
				<View className="my-4 gap-2">
					<SignInForm />
				</View>
			)}
		</View>
	);
}
