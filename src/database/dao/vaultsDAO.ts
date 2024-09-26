"use server";

import { db } from "..";
import { vaults } from "../schema";
import { eq } from "drizzle-orm";

export type Vault = typeof vaults.$inferSelect;

export async function insertVault(name: string, token: string): Promise<Vault> {
	return db
		.insert(vaults)
		.values({
			name,
			token,
		})
		.returning()
		.then((inserted) => {
			return inserted[0];
		});
}

export async function updateVault(id: number, name: string, token: string): Promise<Vault> {
	return db
		.update(vaults)
		.set({ name, token })
		.where(eq(vaults.id, id))
		.returning()
		.then((result) => {
			return result[0];
		});
}

export const getAllVaults = async (): Promise<Vault[]> => {
	return await db.select().from(vaults).orderBy(vaults.createdAt);
};

export const getVaultByToken = async (token: string): Promise<Vault | undefined> => {
	return (await db.select().from(vaults).where(eq(vaults.token, token))).pop();
};
