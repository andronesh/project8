import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const UniwindDarkTheme: Theme = {
	...DarkTheme,
	colors: {
		primary: "#00B7FF",
		background: "#000D18",
		card: "#001927",
		text: "#E4ECF0",
		border: "transparent",
		notification: "#00202D",
	},
};

export const UniwindLightTheme: Theme = {
	...DefaultTheme,
	colors: {
		primary: "#008FDE",
		background: "#E1F1F9",
		card: "#F2F9FD",
		text: "#092531",
		border: "transparent",
		notification: "#FCFEFF",
	},
};
