import { useTagsTree, useTagsTreeQueryKey } from "@/src/features/tags/hooks/useTagsTree";
import TagsTreeElement from "@/src/features/tags/ui/TagsTreeElement";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner, useToast } from "heroui-native";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function TagsScreen() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { data: tagsTree, isFetching, error } = useTagsTree();

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
		<SafeAreaView className="bg-background flex-1 p-4">
			<ScrollView>
				{isFetching && <Spinner size="lg" className="self-center" />}
				{tagsTree && tagsTree.map((tagNode) => <TagsTreeElement key={tagNode.id} tagNode={tagNode} />)}
			</ScrollView>
		</SafeAreaView>
	);
}
