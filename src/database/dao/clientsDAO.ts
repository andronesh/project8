"use server";

import { db } from "..";
import { clients } from "../schema";
import { eq } from "drizzle-orm";

export type Client = typeof clients.$inferSelect;

export async function insertClient(name: string, token: string): Promise<Client> {
	return db
		.insert(clients)
		.values({
			name,
			token,
		})
		.returning()
		.then((inserted) => {
			return inserted[0];
		});
}

export async function updateClient(id: number, name: string, token: string): Promise<Client> {
	return db
		.update(clients)
		.set({ name, token })
		.where(eq(clients.id, id))
		.returning()
		.then((result) => {
			return result[0];
		});
}

export const getAllClients = async (): Promise<Client[]> => {
	return await db.select().from(clients).orderBy(clients.createdAt);
};

export const getClientByToken = async (token: string): Promise<Client | undefined> => {
	return (await db.select().from(clients).where(eq(clients.token, token))).pop();
};
