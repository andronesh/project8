import { useTagsTree, useTagsTreeQueryKey } from "@/src/features/tags/hooks/useTagsTree";
import TagEditableForm from "@/src/features/tags/ui/TagEditableForm";
import TagsTreeElement from "@/src/features/tags/ui/TagsTreeElement";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, Spinner, useToast } from "heroui-native";
import { TagNode } from "project8_nextjs/types";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";

export default function TagsScreen() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { data: tagsTree, isFetching, error } = useTagsTree();
	// const [isTagEditableFormVisible, setTagEditableFormVisible] = useState(false);
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

	return (
		<SafeAreaView className="flex-1 p-4">
			<ScrollView>
				{isFetching && <Spinner size="lg" className="self-center" />}
				{tagsTree &&
					tagsTree.map((tagNode) => (
						<TagsTreeElement key={tagNode.id} tagNode={tagNode} onPress={setTagNodeUnderAction} />
					))}
			</ScrollView>
			<Dialog
				isOpen={tagNodeUnderAction !== null}
				onOpenChange={(isOpen) => {
					if (!isOpen) setTagNodeUnderAction(null);
				}}
			>
				<Dialog.Portal>
					<Dialog.Overlay />
					<KeyboardAvoidingView behavior="padding">
					<Dialog.Content>
						<TagEditableForm
							tagNode={tagNodeUnderAction}
							onClose={() => setTagNodeUnderAction(null)}
						/>
					</Dialog.Content>
					</KeyboardAvoidingView>
				</Dialog.Portal>
			</Dialog>
		</SafeAreaView>
	);
}
