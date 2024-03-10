import ProjectEditForm from "@/components/project/ProjectEditForm";
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

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  // const projects: Project[] = new Array<Project>();

  return (
    <div className="h-full bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
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
      <div className="container mx-auto p-6 sm:p-12">
        <ProjectEditForm />
      </div>
      <div className="container mx-auto p-6 sm:p-12">
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            className="mb-4 p-4 bg-gray-800 rounded-lg shadow"
          >
            <h2>{project.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
