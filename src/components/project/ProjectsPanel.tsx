"use client";

import { Project } from "@/server-actions/projectsActions";
import ProjectEditForm from "./ProjectEditForm";
import { useState } from "react";

type Props = {
  projects: Project[];
};

export default function ProjectsPanel({ projects }: Props) {
  const [selectedProject, selectProject] = useState<Project>();
  const [editFormVisible, setEditFormVisible] = useState(false);

  const initProjectCreation = () => {
    selectProject(undefined);
    setEditFormVisible(true);
  };

  const cancelEditForm = () => {
    setEditFormVisible(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap py-4">
        <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
          <div className="sticky top-0 p-4 w-full">
            <div
              className="flex items-center justify-center mb-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:cursor-pointer hover:bg-gray-700"
              onClick={() => initProjectCreation()}
            >
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            {projects?.map((project: Project) => (
              <div
                key={project.id}
                className={`mb-2 p-4 ${
                  selectedProject?.id === project.id
                    ? "bg-blue-900"
                    : "bg-gray-800 hover:bg-gray-700"
                } rounded-lg shadow hover:cursor-pointer`}
                onClick={() => {
                  selectProject(project);
                  setEditFormVisible(true);
                }}
              >
                <h2>{project.name}</h2>
              </div>
            ))}
          </div>
        </aside>
        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          {editFormVisible && (
            <ProjectEditForm
              project={selectedProject}
              onCancel={cancelEditForm}
            />
          )}
        </main>
      </div>
    </div>
  );
}
