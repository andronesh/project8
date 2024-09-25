import { getClientByToken } from "@/database/dao/clientsDAO";
import { getAllProjects } from "@/database/dao/projectsDAO";

export async function GET(req: Request) {
	// TODO return only those projects, that client has access to
	const syncToken = req.headers.get("X-Sync-Token")?.trim();
	if (syncToken) {
		const client = await getClientByToken(syncToken);
		if (client) {
			const projects = await getAllProjects();
			return Response.json({ projects });
		} else {
			return Response.json(
				{
					message: "Only registered clients can access projects list",
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
