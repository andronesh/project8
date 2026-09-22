import { parse } from "node-html-parser";

export async function fetchUrlAndParseMetadata(url: string) {
	const response = await fetch(url);
	const html = await response.text();
	const root = parse(html);

	const getMeta = (name: string) =>
		root.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ||
		root.querySelector(`meta[name="${name}"]`)?.getAttribute("content");

	let faviconUrl = root
		.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
		.pop()
		?.getAttribute("href");

	if (faviconUrl && !faviconUrl.startsWith("http")) {
		const origin = new URL(response.url).origin;
		faviconUrl = origin + faviconUrl;
	}

	return {
		title: decodeEntities(root.querySelector("title")?.innerText),
		description: decodeEntities(getMeta("description") || getMeta("og:description")),
		faviconUrl: faviconUrl,
		thumbnailUrl: getMeta("og:image") || getMeta("twitter:image"),
		finalUrl: response.url,
	};
}

function decodeEntities(str: string | undefined) {
	if (!str) return undefined;
	return str.replace(/&#(\d+);/g, (match, dec) => {
		return String.fromCharCode(dec);
	});
}
