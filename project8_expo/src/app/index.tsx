import { useState } from "react";
import { Button, Image, Switch, Text, TextInput, View } from "react-native";

export default function Index() {
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<View className="flex-1 p-4">
			<Text className="text-lg text-black dark:text-white">
				Edit app/index.tsx to edit this screen.
			</Text>
			<View className="my-4 gap-2">
				<TextInput
					placeholder="Enter text..."
					className="border border-gray-300 rounded-lg p-3 text-base text-black dark:text-white"
					underlineColorAndroidClassName="accent-transparent"
				/>
				<TextInput
					placeholder="Enter text..."
					className="border border-gray-300 rounded-lg p-3 text-base text-black dark:text-white"
					underlineColorAndroidClassName="accent-transparent"
				/>
				<Button
					title={`Simple Button`}
					onPress={() => console.log("Simple Button")}
				/>
				<Button
					title="Color Button"
					colorClassName="accent-amber-500 dark:accent-amber-400"
					onPress={() => console.log("Simple Button")}
				/>
				<Switch
					value={isEnabled}
					onValueChange={setIsEnabled}
					className="m-2"
					trackColorOnClassName="accent-blue-500 dark:accent-blue-400"
					trackColorOffClassName="accent-gray-300 dark:accent-gray-700"
					ios_backgroundColorClassName="accent-gray-300 dark:accent-gray-700"
				/>
			</View>
			<Image
				source={{
					uri: "https://walter-r2.trakt.tv/images/users/011/839/218/avatars/medium/dc8ededd5c.jpg",
				}}
				className="w-24 h-24 rounded-lg"
			/>
		</View>
	);
}
