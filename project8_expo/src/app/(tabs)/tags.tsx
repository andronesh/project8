import { useTagsTree, useTagsTreeQueryKey } from "@/src/features/tags/hooks/useTagsTree";
import TagEditableForm from "@/src/features/tags/ui/TagEditableForm";
import TagsTreeElement from "@/src/features/tags/ui/TagsTreeElement";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Button, Dialog, Spinner, useToast } from "heroui-native";
import { TagNode } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";

export default function TagsScreen() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { data: tagsTree, isFetching, error } = useTagsTree();
	const [isTagEditableFormVisible, setTagEditableFormVisible] = useState(false);
	const [tagNodeUnderAction, setTagNodeUnderAction] = useState<TagNode | null>(null);

	useEffect(() => {
		if (error) {
			toast.show({
				label: "Failed to fetch tags tree",
				description: JSON.stringify(error),
				variant: "danger",
				actionLabel: "Retry",
				onActionPress: ({ hide }) => {
					hide();
					queryClient.invalidateQueries({ queryKey: useTagsTreeQueryKey() });
				},
			});
		}
	}, [error]);

	const showEditableForm = (tagNode: TagNode | null) => {
		setTagEditableFormVisible(true);
		setTagNodeUnderAction(tagNode);
	};	

	return (
		<SafeAreaView className="flex-1 p-4">
			<Stack.Screen
				options={{
					headerRight: () => (
						<Button
							variant="tertiary"
							size="sm"
							isIconOnly
							onPress={() => showEditableForm(null)}
							className="mr-2"
						>
							<MaterialDesignIcons name="plus" size={24} className="text-foreground" />
						</Button>
					),
				}}
			/>
			<ScrollView>
				{isFetching && <Spinner size="lg" className="self-center" />}
				{tagsTree &&
					tagsTree.map((tagNode) => (
						<TagsTreeElement key={tagNode.id} tagNode={tagNode} onPress={() => showEditableForm(tagNode)} />
					))}
			</ScrollView>
			<Dialog
				isOpen={isTagEditableFormVisible}
				onOpenChange={(isOpen) => {
					if (!isOpen) {
						setTagNodeUnderAction(null);
						setTagEditableFormVisible(false);
					}
				}}
			>
				<Dialog.Portal>
					<Dialog.Overlay />
					<KeyboardAvoidingView behavior="padding">
						<Dialog.Content>
							<TagEditableForm
								tagNode={tagNodeUnderAction}
								onClose={() => {
									setTagNodeUnderAction(null);
									setTagEditableFormVisible(false);
								}}
							/>
						</Dialog.Content>
					</KeyboardAvoidingView>
				</Dialog.Portal>
			</Dialog>
		</SafeAreaView>
	);
}
