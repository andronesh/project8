import ProjectsPanel from "@/components/project/ProjectsPanel";
import { getAllProjects } from "@/database/dao/projectsDAO";
import { Project } from "@/server-actions/projectsActions";

export default async function Dashboard() {
  const projects: Project[] = await getAllProjects();

  return (
    <div className=" bg-gray-900 text-gray-300">
      <ProjectsPanel projects={projects} />
    </div>
  );
}
