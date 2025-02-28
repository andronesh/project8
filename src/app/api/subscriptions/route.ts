import { getVaultByToken } from "@/database/dao/vaultsDAO";
import { getAllProjects } from "@/database/dao/projectsDAO";

type SubcriptionRequest = {
	projectId: number;
};

export async function GET(req: Request) {
	// TODO return only those projects, that vault has access to
	const syncToken = req.headers.get("X-Sync-Token")?.trim();
	if (syncToken) {
		const vault = await getVaultByToken(syncToken);
		if (vault) {
			const projects = await getAllProjects();
			return Response.json({ projects });
		} else {
			return Response.json(
				{
					message: "Only registered vaults can access projects list",
				},
				{ status: 403 },
			);
		}
	} else {
		return new Response("", {
			status: 401,
		});
	}
}

export async function POST(req: Request) {
	try {
		const syncToken = req.headers.get("X-Sync-Token")?.trim();
		if (syncToken) {
			const vault = await getVaultByToken(syncToken);
			if (vault) {
				const subcriptionRequest = (await req.json()) as SubcriptionRequest; // TODO: properly validate and convert using zod
				const projects = await getAllProjects();
				return Response.json({ projects }, { status: 201 });
			} else {
				return Response.json(
					{
						message: "Only registered vaults can subscribe to events",
					},
					{ status: 403 },
				);
			}
		} else {
			return new Response("", {
				status: 401,
			});
		}
	} catch (error) {
		console.error("Failed to register subscription", error);
		return new Response(`Unexpected error: ${error}`, {
			status: 500,
		});
	}
}
