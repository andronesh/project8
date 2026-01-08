import { Button, TextField, useToast } from "heroui-native";
import { TagNode } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useCreateTag, useDeleteTag, useUpdateTag } from "../hooks/useTagsMutations";
import { useTagsTree } from "../hooks/useTagsTree";
import TagSelector from "./TagSelector";

type Props = {
	tagNode: TagNode | null;
	onClose?: () => void;
	className?: string;
};

export default function TagEditableForm(props: Props) {
	const [name, setName] = useState(props.tagNode?.name || "");
	const [comment, setComment] = useState(props.tagNode?.comment || "");
	const [parentId, setParentId] = useState<number | null>(props.tagNode?.parentId || null);
	const { toast } = useToast();

	const { data: tagsTree } = useTagsTree();

	const updateTagMutation = useUpdateTag();
	const createTagMutation = useCreateTag();
	const deleteTagMutation = useDeleteTag();

	useEffect(() => {
		setName(props.tagNode?.name || "");
		setComment(props.tagNode?.comment || "");
		setParentId(props.tagNode?.parentId || null);
	}, [props.tagNode]);

	const handleSave = async () => {
		try {
			if (props.tagNode) {
				await updateTagMutation.mutateAsync({
					id: props.tagNode.id,
					tag: {
						name,
						comment: comment || null,
						parentId: parentId,
					},
				});
				toast.show({
					label: "Tag updated",
					variant: "success",
				});
			} else {
				await createTagMutation.mutateAsync({
					name,
					comment: comment || null,
					parentId: parentId,
				});
				toast.show({
					label: "Tag created",
					variant: "success",
				});
			}
			props.onClose?.();
		} catch (error) {
			toast.show({
				label: props.tagNode ? "Failed to update tag" : "Failed to create tag",
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

	const isPending = updateTagMutation.isPending || createTagMutation.isPending || deleteTagMutation.isPending;

	// Recursive function to filter out the current tag and all its descendants
	const getAvailableTags = (nodes: TagNode[]): TagNode[] => {
		const filterDescendants = (node: TagNode): boolean => {
			if (node.id === props.tagNode?.id) return false;
			return true;
		};

		return nodes
			.filter(filterDescendants)
			.map((node) => ({
				...node,
				children: node.children ? getAvailableTags(node.children) : undefined,
			}));
	};

	const availableTags = tagsTree ? getAvailableTags(tagsTree) : [];

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

			<View>
				<Text className="text-muted mb-1 text-sm font-medium">Parent Tag</Text>
				<TagSelector
					tags={availableTags}
					value={parentId}
					onValueChange={setParentId}
					isDisabled={isPending}
				/>
			</View>

			<View className="mt-2 flex-row justify-between">
				{props.tagNode ? (
					<Button variant="danger-soft" onPress={handleDelete} isDisabled={isPending}>
						Delete
					</Button>
				) : (
					<View />
				)}

				<View className="flex-row gap-2">
					<Button variant="secondary" onPress={props.onClose} isDisabled={isPending}>
						Cancel
					</Button>
					<Button variant="primary" onPress={handleSave} isDisabled={isPending || !name.trim()}>
						{props.tagNode ? "Save" : "Create"}
					</Button>
				</View>
			</View>
		</View>
	);
}
