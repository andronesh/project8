import {
	useAllLinksPaginatedQuery,
	useAllLinksPaginatedQueryKey,
} from "@/src/features/links/hooks/useLinksPaginated";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Spinner, useToast } from "heroui-native";
import { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";

export default function LinksScreen() {
	const limit = 33;
	const offset = 0;

	const { data: links, isFetching, error } = useAllLinksPaginatedQuery(limit, offset);
	const { toast } = useToast();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (error) {
			toast.show({
				label: "Failed to fetch tags tree",
				description: JSON.stringify(error),
				variant: "danger",
				actionLabel: "Retry",
				onActionPress: ({ hide }) => {
					hide();
					queryClient.invalidateQueries({ queryKey: useAllLinksPaginatedQueryKey(limit, offset) });
				},
			});
		}
	}, [error]);

	return (
		<ScrollView className={"grow px-3"} contentContainerClassName="gap-3">
			{isFetching && <Spinner size="lg" className="self-center" />}
			{links &&
				links.map((link) => (
					<Link
						key={link.id}
						href={{
							pathname: "/links/[linkId]",
							params: { linkId: link.id, linkDtoString: JSON.stringify(link) },
						}}
						className="bg-surface rounded-lg"
					>
						<View className="flex px-3 py-2">
							<Text className="text-foreground text-lg">{link.title}</Text>
							<Text className="text-muted text-md mt-0.5">{link.url}</Text>
						</View>
					</Link>
				))}
		</ScrollView>
	);
}
