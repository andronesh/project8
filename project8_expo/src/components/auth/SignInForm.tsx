import { authClient } from "@/src/utils/authClient";
import { Button, Spinner, TextField, useThemeColor, useToast } from "heroui-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { FadeIn, LinearTransition } from "react-native-reanimated";

export default function SignInForm() {
	const themeColorAccentForeground = useThemeColor("accent-foreground");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			const result = await authClient.signIn.email({
				email,
				password,
			});
			if (result.error) {
				console.error("Login failed:", result.error);
				toast.show({
					label: "Login failed",
					description: JSON.stringify(result.error),
					variant: "danger",
				});
			}
		} catch (error) {
			console.error("Login failed:", error);
			toast.show({
				label: "Login failed",
				description: JSON.stringify(error),
				variant: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="gap-3">
			<View className="gap-3">
				<TextField>
					<TextField.Label>Email</TextField.Label>
					<TextField.Input
						placeholder="email@example.com"
						textContentType="emailAddress"
						value={email}
						onChangeText={setEmail}
					/>
				</TextField>
				<TextField>
					<TextField.Label>Password</TextField.Label>
					<TextField.Input
						placeholder="********"
						textContentType="password"
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
				</TextField>
				<Button
					layout={LinearTransition.springify()}
					variant="primary"
					onPress={handleSignIn}
					isIconOnly={isLoading}
					isDisabled={isLoading}
					className="self-center"
				>
					{isLoading ? <Spinner entering={FadeIn.delay(50)} color={themeColorAccentForeground} /> : "Sign In"}
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}
