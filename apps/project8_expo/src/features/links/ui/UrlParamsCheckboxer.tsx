import { Checkbox, FormField } from "heroui-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Props = {
	url: string;
	onChange?: (url: string) => void;
	className?: string;
};

type UrlParsed = {
	fullPath: string;
	paramsStr?: string;
	params?: UrlParsedParam[];
	finalUrl: string;
};

type UrlParsedParam = {
	value: string;
	isSelected: boolean;
};

export default function UrlParamsCheckboxer(props: Props) {
	const [urlParsed, setUrlParsed] = useState<UrlParsed | null>(null);

	const toggleParamSelection = (index: number, isSelected: boolean) => {
		if (!urlParsed?.params) return;
		const paramsCopy = [...urlParsed?.params];
		paramsCopy[index].isSelected = isSelected;
		const selectedParamsStr = urlParsed.params
			?.filter((param) => param.isSelected)
			.map((param) => param.value)
			.join("&");
		setUrlParsed((prev) => ({
			fullPath: prev?.fullPath!,
			paramsStr: selectedParamsStr,
			params: paramsCopy,
			finalUrl: selectedParamsStr ? prev?.fullPath! + "?" + selectedParamsStr : prev?.fullPath!,
		}));
	};

	useEffect(() => {
		if (props.url) {
			const parsedUrl = new URL(props.url);
			const fullPath = parsedUrl.origin + parsedUrl.pathname;

			if (parsedUrl.search) {
				let paramsStr = parsedUrl.search.startsWith("?") ? parsedUrl.search.substring(1) : parsedUrl.search;
				const params = paramsStr
					.split("&")
					.map((param) => {
						return {
							value: param,
							isSelected: true,
						};
					})
					.filter((param) => param !== null);
				setUrlParsed({ fullPath, paramsStr, params, finalUrl: props.url });
			} else {
				setUrlParsed({ fullPath, finalUrl: props.url });
			}
		}
	}, [props.url]);

	useEffect(() => {
		if (urlParsed) {
			props.onChange?.(urlParsed?.finalUrl);
		}
	}, [urlParsed?.finalUrl]);

	return (
		<View>
			<FormField.Label>URL </FormField.Label>
			<View className="bg-field gap-2 rounded-2xl px-4 py-3">
				<Text className="text-field-foreground">{urlParsed?.fullPath}</Text>
				{urlParsed?.params && (
					<View className="gap-2 pl-2">
						{urlParsed.params.map((param, index) => (
							<View key={index} className="flex-row gap-2">
								<Checkbox
									isOnSurface={true}
									isSelected={param.isSelected}
									onSelectedChange={(isSelected) => toggleParamSelection(index, isSelected)}
								/>
								<Text className="text-field-foreground">{param.value}</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</View>
	);
}
