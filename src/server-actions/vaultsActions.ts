"use server";

import * as vaultsDAO from "@/database/dao/vaultsDAO";

export async function addVault(name: string, token: string) {
	const nameSanitised = name.trim();
	const tokenSanitised = token.trim();

	if (!nameSanitised || nameSanitised.length === 0) {
		throw new Error("Vault name should not be empty"); // TODO: properly handle validation
	}

	if (!tokenSanitised || tokenSanitised.length === 0) {
		throw new Error("Vault token should not be empty"); // TODO: properly handle validation
	}

	// TODO only authed user can add vaults, and store vaults.owner

	// const userId = await getAuthedUserId();
	// if (!userId) {
	// 	console.error("User is not authenticated");
	// 	throw new Error("User is not authenticated");
	// }

	try {
		await vaultsDAO.insertVault(nameSanitised, token);
	} catch (error) {
		console.error(`Failed to save vault with name "${name}"`, error);
		throw error;
	}
}

export async function updateVault(id: number, name: string, token: string) {
	const nameSanitised = name.trim();
	const tokenSanitised = token.trim();

	if (!nameSanitised || nameSanitised.length === 0) {
		throw new Error("Vault name should not be empty"); // TODO: properly handle validation
	}

	if (!tokenSanitised || tokenSanitised.length === 0) {
		throw new Error("Vault token should not be empty"); // TODO: properly handle validation
	}

	// TODO only owner can update vaults

	// const userId = await getAuthedUserId();
	// if (!userId) {
	// 	console.error("User is not authenticated");
	// 	throw new Error("User is not authenticated");
	// }

	try {
		await vaultsDAO.updateVault(id, nameSanitised, tokenSanitised);
	} catch (error) {
		console.error(`Failed to save vault with id "${id}"`, error);
		throw error;
	}
}
