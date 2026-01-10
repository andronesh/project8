import { Button, TextField, useToast } from "heroui-native";
import { Link, LinkEditableDto } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { useUpdateLinkMutation, useDeleteLinkMutation } from "../hooks/useLinksMutations";
import { useNavigation } from "expo-router";

type Props = {
	link: Link;
	onCancel?: () => void;
	onUpdate?: (link: Link | null) => void;
	className?: string;
};

export default function LinkEditableForm(props: Props) {
	const { toast } = useToast();
	const navigation = useNavigation();
	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
			// TODO handle unsaved changes
			props.onCancel?.();
		});

		return unsubscribe;
	}, [navigation]);

	const [linkFormData, setLinkFormData] = useState<LinkEditableDto>({
		url: props.link.url,
		title: props.link.title,
		faviconUrl: props.link.faviconUrl,
		thumbnailUrl: props.link.thumbnailUrl,
		description: props.link.description,
		comment: props.link.comment,
	});

	const updateLinkMutation = useUpdateLinkMutation();
	const deleteLinkMutation = useDeleteLinkMutation();

	const handleSave = async () => {
		try {
			const updatedLink = await updateLinkMutation.mutateAsync({
				id: props.link.id,
				link: linkFormData,
			});
			toast.show({
				label: "Link updated",
				variant: "success",
			});
			props.onUpdate?.(updatedLink);
		} catch (error) {
			toast.show({
				label: "Failed to update link",
				description: JSON.stringify(error),
				variant: "danger",
			});
		}
	};

	const handleDelete = async () => {
		try {
			await deleteLinkMutation.mutateAsync(props.link.id);
			toast.show({
				label: "Link deleted",
				variant: "success",
			});
			props.onUpdate?.(null);
		} catch (error) {
			toast.show({
				label: "Failed to delete link",
				description: JSON.stringify(error),
				variant: "danger",
			});
		}
	};

	const isPending = updateLinkMutation.isPending || deleteLinkMutation.isPending;

	return (
		<ScrollView className={"grow px-3"} contentContainerClassName="gap-4">
			{linkFormData.description && (
				<Text className="text-field-foreground bg-field rounded-lg p-3 text-lg">
					{linkFormData.description}
				</Text>
			)}
			{linkFormData.thumbnailUrl && (
				<View className="flex rounded-lg">
					<Image
						source={{
							uri: linkFormData.thumbnailUrl,
						}}
						className="h-52 w-full self-center"
						resizeMode="contain"
					/>
				</View>
			)}

			{linkFormData.title && (
				<Text className="text-field-foreground bg-field rounded-lg p-3 text-2xl">{linkFormData.title}</Text>
			)}

			<KeyboardAvoidingView className="gap-4">
				<TextField>
					<TextField.Label>URL</TextField.Label>
					<TextField.Input
						placeholder="URL"
						value={linkFormData.url}
						onChangeText={(url) => setLinkFormData({ ...linkFormData, url })}
						editable={!isPending}
					/>
				</TextField>

				<TextField>
					<TextField.Label>Comment</TextField.Label>
					<TextField.Input
						placeholder="Comment"
						value={linkFormData.comment || ""}
						onChangeText={(comment) => setLinkFormData({ ...linkFormData, comment })}
						editable={!isPending}
					/>
				</TextField>
			</KeyboardAvoidingView>

			<View className="flex-row justify-between">
				<Button variant="danger-soft" onPress={handleDelete} isDisabled={isPending}>
					{deleteLinkMutation.isPending ? "Deleting..." : "Delete"}
				</Button>

				<View className="mb-3 flex-row gap-2">
					<Button variant="secondary" onPress={props.onCancel} isDisabled={isPending}>
						Cancel
					</Button>
					<Button variant="primary" onPress={handleSave} isDisabled={isPending}>
						{updateLinkMutation.isPending ? "Saving..." : "Save"}
					</Button>
				</View>
			</View>
		</ScrollView>
	);
}
