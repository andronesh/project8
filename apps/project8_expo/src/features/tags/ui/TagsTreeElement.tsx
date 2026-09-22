import { TagNode } from "project8_nextjs/types";
import { Pressable, Text, View } from "react-native";

type Props = {
	tagNode: TagNode;
	onPress?: (tagNode: TagNode) => void;
	className?: string;
};

export default function TagsTreeElement(props: Props) {
	const handlePressOnTag = (tagNode: TagNode) => {
		if (props.onPress) {
			props.onPress(tagNode);
		}
	};

	return (
		<View className={` ${props.className}`}>
			<Pressable onPress={() => handlePressOnTag(props.tagNode)}>
				<View className="bg-surface mt-3 flex-row rounded-lg px-5 py-3">
					<Text className="text-foreground text-lg">{props.tagNode.name}</Text>
				</View>
			</Pressable>
			{props.tagNode.children &&
				props.tagNode.children.map((child) => (
					<TagsTreeElement key={child.id} tagNode={child} onPress={handlePressOnTag} className="pl-8" />
				))}
		</View>
	);
}
