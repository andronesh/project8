import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function DeepLinkRedirect() {
	const router = useRouter();

	useEffect(() => {
		console.info("DeepLinkRedirect useEffect triggered");
		let mounted = true;
		async function handle() {
			try {
				const url = await Linking.getInitialURL();
				if (!mounted) return;

				if (url) {
					const parsed = Linking.parse(url);
					const hasDataUrl = !!parsed.queryParams?.dataUrl || !!parsed.path?.startsWith("dataUrl");
					if (hasDataUrl) {
						router.replace("/shareintent");
						return;
					}
				}

				router.replace("/");
			} catch (e) {
				router.replace("/");
			}
		}

		handle();
		return () => {
			mounted = false;
		};
	}, [router]);

	return null;
}
