import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProjectsPanel from "@/components/project/ProjectsPanel";
import { getAllProjects } from "@/database/dao/projectsDAO";
import { Project } from "@/server-actions/projectsActions";
import { Suspense } from "react";

export default async function Dashboard() {
  const projects: Project[] = await getAllProjects();

  return (
    <Suspense fallback={<LoadingSpinner className="px-20 my-5" />}>
      <ProjectsPanel projects={projects} />
    </Suspense>
  );
}
