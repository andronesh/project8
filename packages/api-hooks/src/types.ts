import { type ApiClient } from "@project8/api-hooks";
import type { InferResponseType } from "hono/client";

export type VaultDto = InferResponseType<ApiClient["api"]["vaults"]["$get"], 200>[number];
export type TiktokLinkDto = InferResponseType<ApiClient["api"]["tiktok"]["links"]["$get"], 200>[number];
