// import { getVaultByToken } from "@/database/dao/vaultsDAO";
import { getAllProjects } from "@/database/dao/projectsDAO";

export async function GET() {
	const projects = await getAllProjects();
	return Response.json({ projects });

	// TODO return only those projects, that vault has access to
	// const syncToken = req.headers.get("X-Sync-Token")?.trim();
	// if (syncToken) {
	// 	const vault = await getVaultByToken(syncToken);
	// 	if (vault) {
	// 		const projects = await getAllProjects();
	// 		return Response.json({ projects });
	// 	} else {
	// 		return Response.json(
	// 			{
	// 				message: "Only registered vaults can access projects list",
	// 			},
	// 			{ status: 403 },
	// 		);
	// 	}
	// } else {
	// 	return new Response("", {
	// 		status: 401,
	// 	});
	// }
}
