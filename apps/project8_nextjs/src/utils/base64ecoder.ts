export async function getBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = reject;
	});
}

export function fromBase64(encoded: string): string {
	return Buffer.from(encoded, "base64").toString();
}
