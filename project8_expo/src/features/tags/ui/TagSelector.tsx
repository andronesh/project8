import { Button, Select } from "heroui-native";
import { TagNode } from "project8_nextjs/types";
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { IconThemed } from "../../common/IconThemed";

type Props = {
	tags: TagNode[];
	value: number | null;
	onValueChange: (id: number | null) => void;
	title?: string;
	isDisabled?: boolean;
};

type FlattenedTag = {
	id: number | null;
	name: string;
	depth: number;
};

export default function TagSelector({ tags, value, onValueChange, isDisabled }: Props) {
	const flattenedTags = useMemo(() => {
		const result: FlattenedTag[] = [];

		function flatten(nodes: TagNode[], depth: number) {
			for (const node of nodes) {
				result.push({ id: node.id, name: node.name, depth });
				if (node.children && node.children.length > 0) {
					flatten(node.children, depth + 1);
				}
			}
		}

		flatten(tags, 0);
		return result;
	}, [tags]);

	const selectedTag = flattenedTags.find((t) => t.id === value);

	return (
		<Select
			value={selectedTag ? { value: String(selectedTag.id), label: selectedTag.name } : undefined}
			onValueChange={(val) => {
				const id = val?.value === "null" ? null : Number(val?.value);
				onValueChange(id);
			}}
			isDisabled={isDisabled}
		>
			<View className="flex-row items-center">
				<Select.Trigger asChild>
					<Button
						variant="tertiary"
						size="md"
						className={`flex-1 justify-between ${value ? "rounded-tr-none rounded-br-none" : ""}`}
						isDisabled={isDisabled}
					>
						<Text className={`text-foreground flex-1 text-left ${value ? "" : "text-field-placeholder"}`}>
							{selectedTag ? selectedTag.name : "Select from list"}
						</Text>
					</Button>
				</Select.Trigger>
				{value && (
					<Button
						variant="tertiary"
						size="md"
						isIconOnly
						onPress={() => onValueChange(null)}
						className="rounded-tl-none rounded-bl-none"
					>
						<IconThemed name="close" size={32} className="text-muted" />
					</Button>
				)}
			</View>
			<Select.Portal>
				<Select.Overlay />
				<Select.Content width={280} className="rounded-2xl" placement="bottom">
					<ScrollView className="max-h-80">
						{flattenedTags.map((item) => (
							<Select.Item
								key={String(item.id)}
								value={String(item.id)}
								label={item.name}
								style={{ paddingLeft: item.depth * 22 + 12 }}
							>
								<View className="flex-1 flex-row items-center gap-3">
									<Text className="text-foreground flex-1 text-base">{item.name}</Text>
								</View>
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</ScrollView>
				</Select.Content>
			</Select.Portal>
		</Select>
	);
}
