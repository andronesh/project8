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
    <div className="h-full bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 pb-0">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl md:text-4xl text-white mb-6">
            Project<b>8</b>
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
      <ProjectsPanel projects={data !== null ? (data as Project[]) : []} />
    </div>
  );
}
