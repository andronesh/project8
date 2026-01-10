import { useLocalSearchParams } from "expo-router";
import LinkEditableForm from "@/src/features/links/ui/LinkEditableForm";
import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { Button, useToast } from "heroui-native";
import { Link } from "project8_nextjs/types";
import { useRouter } from "expo-router";

export default function LinkDetailsScreen() {
	const { toast } = useToast();
	const router = useRouter();
	const { linkId, linkDtoString } = useLocalSearchParams();
	const [isEditingFormVisible, setEditingFormVisible] = useState(false);
	const [linkDto, setLinkDto] = useState<Link | null>(null);

	useEffect(() => {
		if (linkDtoString) {
			setLinkDto(JSON.parse(linkDtoString as string));
		}
	}, [linkDtoString]);

	return (
		<View className="flex-1 gap-4 p-4">
			{linkDto && isEditingFormVisible && (
				<LinkEditableForm
					link={linkDto}
					onCancel={() => {
						setEditingFormVisible(false);
					}}
					onUpdate={(updatedLink) => {
						if (!updatedLink) {
							if (router.canGoBack()) {
								router.back();
							} else {
								router.replace("/links");
							}
						}
						setLinkDto(updatedLink);
						setEditingFormVisible(false);
					}}
				/>
			)}
			{!isEditingFormVisible && linkDto && (
				<View>
					<View className="flex px-3 py-2">
						{linkDto.thumbnailUrl && (
							<View className="mb-4 flex rounded-lg">
								<Image
									source={{
										uri: linkDto.thumbnailUrl,
									}}
									className="h-88 w-full self-center"
									resizeMode="contain"
									onError={({ nativeEvent: { error } }) => {
										console.error("Failed to load thumbnail", error);
										toast.show({
											label: "Failed to load thumbnail",
											description: JSON.stringify(error),
											variant: "danger",
										});
									}}
								/>
							</View>
						)}
						<Text className="text-muted text-md">{linkDto.url}</Text>
						<View className="flex-row items-center gap-2">
							<Image
								source={{
									uri: linkDto.faviconUrl!,
								}}
								className="h-6 w-6"
								resizeMode="contain"
								onError={({ nativeEvent: { error } }) => {
									console.error("Failed to load favicon", error);
									toast.show({
										label: "Failed to load favicon",
										description: JSON.stringify(error),
										variant: "danger",
									});
								}}
							/>
							<Text className="text-foreground text-lg">{linkDto.title}</Text>
						</View>
						{linkDto.description && <Text className="text-foreground text-md">{linkDto.description}</Text>}
						{linkDto.comment && <Text className="text-foreground text-md mt-1">{linkDto.comment}</Text>}
					</View>
					<Button onPress={() => setEditingFormVisible(true)}>Edit</Button>
				</View>
			)}
			{!linkDto && <Text className="text-foreground bg-surface rounded-lg p-3 text-lg">Link not found</Text>}
		</View>
	);
}
