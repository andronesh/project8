import { Text, View } from "react-native";
import { TagNode } from "project8_nextjs/types";

type Props = {
	tagNode: TagNode;
	className?: string;
};

export default function TagsTreeElement(props: Props) {
	return (
		<View className={` ${props.className}`}>
			<View className="bg-surface mt-3 flex-row rounded-lg px-5 py-3">
				<Text className="text-foreground text-lg">{props.tagNode.name}</Text>
			</View>
			{props.tagNode.children &&
				props.tagNode.children.map((child) => (
					<TagsTreeElement key={child.id} tagNode={child} className="pl-8" />
				))}
		</View>
	);
}
