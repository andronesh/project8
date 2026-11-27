import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getAllVaults, getVaultById, getVaultByToken, insertVault, updateVault } from "@project8/domain/daos/vaultsDAO";

import { authMiddleware } from "../middleware/auth.middleware";

const byIdParamsSchema = z.object({
	id: z.coerce.number().int().min(1),
});

const vaultEditableDtoSchema = z.object({
	name: z.string().trim().min(1, "Vault name should not be empty").max(88),
	token: z.string().trim().min(1, "Vault token should not be empty").max(36),
	url: z
		.string()
		.trim()
		.max(128)
		.transform((val) => val || undefined)
		.nullable()
		.optional(),
});

export const vaultsRoutes = new Hono<{
	Variables: {
		user: {
			id: string;
		};
	};
}>()
	.use("*", authMiddleware)
	.get(
		"/",
		zValidator(
			"query",
			z.object({
				token: z.string().trim().min(1).optional(),
			})
		),
		async (c) => {
			try {
				const { token } = c.req.valid("query");

				if (token) {
					const vault = await getVaultByToken(token);

					if (!vault) {
						return c.json({ error: "Vault not found" }, 404);
					}

					return c.json([vault]);
				}

				const vaults = await getAllVaults();
				return c.json(vaults);
			} catch (error) {
				console.error("Failed to fetch vaults", error);
				return c.json({ error: "Failed to fetch vaults" }, 500);
			}
		}
	)
	.post("/", zValidator("json", vaultEditableDtoSchema), async (c) => {
		try {
			const body = c.req.valid("json");

			// TODO only authed user can add vaults, and store vaults.owner
			const createdVault = await insertVault(body.name, body.token, body.url ?? undefined);
			return c.json(createdVault, 201);
		} catch (error) {
			console.error("Failed to create vault", error);
			return c.json({ error: "Failed to create vault" }, 500);
		}
	})
	.put("/:id", zValidator("param", byIdParamsSchema), zValidator("json", vaultEditableDtoSchema), async (c) => {
		try {
			const { id } = c.req.valid("param");
			const body = c.req.valid("json");

			const existingVault = await getVaultById(id);
			if (!existingVault) {
				return c.json({ error: "Vault not found" }, 404);
			}

			// TODO only owner can update vaults
			const updatedVault = await updateVault(id, body.name, body.token, body.url ?? undefined);
			return c.json(updatedVault);
		} catch (error) {
			console.error("Failed to update vault", error);
			return c.json({ error: "Failed to update vault" }, 500);
		}
	});
