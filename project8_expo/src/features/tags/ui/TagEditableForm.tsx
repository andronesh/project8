import { Button, TextField, useToast } from "heroui-native";
import { TagNode } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDeleteTag, useUpdateTag } from "../hooks/useTagsMutations";

type Props = {
	tagNode: TagNode | null;
	onClose?: () => void;
	className?: string;
};

export default function TagEditableForm(props: Props) {
	const [name, setName] = useState(props.tagNode?.name || "");
	const [comment, setComment] = useState(props.tagNode?.comment || "");
	const { toast } = useToast();

	const updateTagMutation = useUpdateTag();
	const deleteTagMutation = useDeleteTag();

	useEffect(() => {
		if (props.tagNode) {
			setName(props.tagNode.name);
			setComment(props.tagNode.comment || "");
		}
	}, [props.tagNode]);

	const handleSave = async () => {
		if (!props.tagNode) return;

		try {
			await updateTagMutation.mutateAsync({
				id: props.tagNode.id,
				tag: {
					name,
					comment: comment || null,
					parentId: props.tagNode.parentId,
				},
			});
			toast.show({
				label: "Tag updated",
				variant: "success",
			});
			props.onClose?.();
		} catch (error) {
			toast.show({
				label: "Failed to update tag",
				description: JSON.stringify(error),
				variant: "danger",
			});
		}
	};

	const handleDelete = async () => {
		if (!props.tagNode) return;

		try {
			await deleteTagMutation.mutateAsync(props.tagNode.id);
			toast.show({
				label: "Tag deleted",
				variant: "success",
			});
			props.onClose?.();
		} catch (error) {
			toast.show({
				label: "Failed to delete tag",
				description: JSON.stringify(error),
				variant: "danger",
			});
		}
	};

	const isPending = updateTagMutation.isPending || deleteTagMutation.isPending;

	return (
		<View className={`gap-4 ${props.className}`}>
			<TextField>
				<TextField.Label>Name</TextField.Label>
				<TextField.Input placeholder="Tag name" value={name} onChangeText={setName} editable={!isPending} />
			</TextField>
			<TextField>
				<TextField.Label>Comment</TextField.Label>
				<TextField.Input
					placeholder="Add a comment..."
					value={comment}
					onChangeText={setComment}
					editable={!isPending}
					multiline
				/>
			</TextField>

			<View className="mt-2 flex-row justify-between">
				<Button variant="danger-soft" onPress={handleDelete} isDisabled={isPending}>
					Delete
				</Button>

				<View className="flex-row gap-2">
					<Button variant="secondary" onPress={props.onClose} isDisabled={isPending}>
						Cancel
					</Button>
					<Button variant="primary" onPress={handleSave} isDisabled={isPending || !name.trim()}>
						Save
					</Button>
				</View>
			</View>
		</View>
	);
}
