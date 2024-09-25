"use server";

import * as clientsDAO from "@/database/dao/clientsDAO";

export async function registerClient(name: string, token: string) {
	const nameSanitised = name.trim();
	const tokenSanitised = token.trim();

	if (!nameSanitised || nameSanitised.length === 0) {
		throw new Error("Client name should not be empty"); // TODO: properly handle validation
	}

	if (!tokenSanitised || tokenSanitised.length === 0) {
		throw new Error("Client token should not be empty"); // TODO: properly handle validation
	}

	// TODO only authed user can add clients, and store clients.owner

	// const userId = await getAuthedUserId();
	// if (!userId) {
	// 	console.error("User is not authenticated");
	// 	throw new Error("User is not authenticated");
	// }

	try {
		await clientsDAO.insertClient(nameSanitised, token);
	} catch (error) {
		console.error(`Failed to save client with name "${name}"`, error);
		throw error;
	}
}

export async function updateClient(id: number, name: string, token: string) {
	const nameSanitised = name.trim();
	const tokenSanitised = token.trim();

	if (!nameSanitised || nameSanitised.length === 0) {
		throw new Error("Client name should not be empty"); // TODO: properly handle validation
	}

	if (!tokenSanitised || tokenSanitised.length === 0) {
		throw new Error("Client token should not be empty"); // TODO: properly handle validation
	}

	// TODO only owner can update clients

	// const userId = await getAuthedUserId();
	// if (!userId) {
	// 	console.error("User is not authenticated");
	// 	throw new Error("User is not authenticated");
	// }

	try {
		await clientsDAO.updateClient(id, nameSanitised, tokenSanitised);
	} catch (error) {
		console.error(`Failed to save client with id "${id}"`, error);
		throw error;
	}
}
