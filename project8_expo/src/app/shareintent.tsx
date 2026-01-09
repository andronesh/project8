import { Image, Text, View } from "react-native";

import { Stack, useRouter } from "expo-router";
import { useShareIntentContext } from "expo-share-intent";
import { useEffect, useState } from "react";
import { Button, TextField } from "heroui-native";

export default function ShareIntentScreen() {
	const router = useRouter();
	const { hasShareIntent, shareIntent, error, resetShareIntent } = useShareIntentContext();
	const [sharedText, setSharedText] = useState(shareIntent.text);

	const fetchUrlMetadata = async () => {
		// TODO implemet
	};

	useEffect(() => {
		console.info("--- SHARE INTENT ---");
		console.info(JSON.stringify(shareIntent));
	}, [shareIntent]);

	return (
		<View className="flex-1 gap-4 p-4">
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
			<Text className="text-foreground pt-9 text-center text-lg">
				{hasShareIntent ? `Has Share Intent of type "${shareIntent.type}"` : "There is no Share Intent"}
			</Text>

			{shareIntent?.files?.map((file) => (
				<Image
					key={file.path}
					source={{
						uri: file.path,
					}}
					className="m-2 h-full max-h-96 w-full self-center rounded-lg"
					resizeMode="center"
				/>
			))}
			{error && (
				<Text className="text-danger-foreground text-ld bg-danger m-3 rounded-lg p-2 text-center">
					{error}
				</Text>
			)}
			{!!shareIntent.text && (
				<TextField>
					<TextField.Input value={sharedText || ""} multiline numberOfLines={4} onChangeText={setSharedText} />
				</TextField>
			)}

			<View className="flex-row justify-around">
				{hasShareIntent && (
					<Button variant="danger-soft" onPress={() => resetShareIntent()}>
						Reset
					</Button>
				)}
				<Button
					variant="secondary"
					onPress={() => {
						if (router.canGoBack()) {
							router.back();
						} else {
							router.replace("/");
						}
					}}
				>
					Go Home
				</Button>
				{shareIntent.type === "weburl" && (
					<Button variant="primary" onPress={fetchUrlMetadata}>
						Fetch Metadata
					</Button>
				)}
			</View>
		</View>
	);
}
