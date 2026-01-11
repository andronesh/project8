import { Button, TextField, useToast } from "heroui-native";
import { Link, LinkEditableDto } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { useUpdateLinkMutation, useDeleteLinkMutation } from "../hooks/useLinksMutations";
import { useNavigation } from "expo-router";
import { fetchUrlAndParseMetadata } from "../utils";
import UrlParamsCheckboxer from "./UrlParamsCheckboxer";

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

	const [isUrlMetadataFetching, setIsUrlMetadataFetching] = useState(false);

	const fetchMetadata = async () => {
		setIsUrlMetadataFetching(true);
		try {
			const metadata = await fetchUrlAndParseMetadata(linkFormData.url);
			setLinkFormData({
				...linkFormData,
				url: metadata.finalUrl || linkFormData.url,
				title: metadata.title || linkFormData.title,
				description: metadata.description || linkFormData.description,
				faviconUrl: metadata.faviconUrl || linkFormData.faviconUrl,
				thumbnailUrl: metadata.thumbnailUrl || linkFormData.thumbnailUrl,
			});
		} catch (error) {
			console.error("Failed to fetch metadata", error);
			toast.show({
				label: "Failed to fetch metadata",
				description: JSON.stringify(error),
				variant: "danger",
			});
		} finally {
			setIsUrlMetadataFetching(false);
		}
	};

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

	const isPending = updateLinkMutation.isPending || deleteLinkMutation.isPending || isUrlMetadataFetching;

	return (
		<ScrollView className={"grow px-3"} contentContainerClassName="gap-4">
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

			<KeyboardAvoidingView className="gap-4">
				<TextField>
					<TextField.Label>Description </TextField.Label>
					<TextField.Input
						placeholder="Description"
						className="h-18"
						value={linkFormData.description || ""}
						onChangeText={(description) => setLinkFormData({ ...linkFormData, description })}
						editable={!isPending}
						multiline
					/>
				</TextField>
				<TextField>
					<TextField.Label>Title</TextField.Label>
					<TextField.Input
						placeholder="Title"
						className="h-18"
						value={linkFormData.title || ""}
						onChangeText={(title) => setLinkFormData({ ...linkFormData, title })}
						editable={!isPending}
						multiline
					/>
				</TextField>
				<UrlParamsCheckboxer
					url={props.link.url}
					onChange={(url) => setLinkFormData({ ...linkFormData, url })}
				/>
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

			<Button variant="primary" onPress={fetchMetadata} isDisabled={isPending}>
				{isUrlMetadataFetching ? "Fetching Metadata..." : "Fetch Metadata"}
			</Button>

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
