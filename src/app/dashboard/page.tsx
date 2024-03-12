import ProjectsPanel from "@/components/project/ProjectsPanel";
import { Project } from "@/server-actions/projectsActions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  // const projects: Project[] = new Array<Project>();

  return (
    <div className=" bg-gray-900 text-gray-300">
      <ProjectsPanel projects={data !== null ? (data as Project[]) : []} />
    </div>
  );
}
