import { authClient } from "@/src/utils/authClient";
import { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		setIsLoading(true);
		const result = await authClient.signIn.email({
			email,
			password,
		});
		setIsLoading(false);
		result.error ? console.log("Login failed:", result.error) : console.log("Login successful:", result.data);
	};

	return (
		<View className="gap-3">
			<TextInput
				editable={!isLoading}
				placeholder="Email"
				textContentType="emailAddress"
				value={email}
				onChangeText={setEmail}
				className="rounded-lg border border-gray-300 p-3 text-base text-black dark:text-white"
				underlineColorAndroidClassName="accent-transparent"
			/>
			<TextInput
				editable={!isLoading}
				placeholder="Password"
				textContentType="password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				className="rounded-lg border border-gray-300 p-3 text-base text-black dark:text-white"
				underlineColorAndroidClassName="accent-transparent"
			/>
			<Button title={isLoading ? "Logging in..." : "Login"} disabled={isLoading} onPress={handleLogin} />
		</View>
	);
}
