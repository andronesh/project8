"use client";

import { Project } from "@/server-actions/projectsActions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import IssuesPanel from "../issue/IssuesPanel";
import ProjectEditForm from "./ProjectEditForm";

type Props = {
  projects: Project[];
};

export default function ProjectsPanel({ projects }: Props) {
  const [selectedProject, selectProject] = useState<Project>();
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  const initProjectCreation = () => {
    selectProject(undefined);
    setEditFormOpen(true);
  };

  const showEditForm = (project: Project) => {
    selectProject(project);
    setEditFormOpen(true);
  };

  const cancelEditForm = () => {
    setEditFormOpen(false);
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-1/4">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
        <ul className="py-2 space-y-2">
          {projects?.map((project: Project) => (
            <li key={project.id}>
              <div
                className={`flex items-center justify-between w-full py-2 px-3 transition duration-75 rounded-lg group  text-white  hover:cursor-pointer ${
                  selectedProject?.id === project.id
                    ? "bg-blue-900 hover:bg-blue-900"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => selectProject(project)}
              >
                <h2>{project.name}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  aria-hidden="true"
                  className="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  onClick={() => showEditForm(project)}
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-3/4">
        {selectedProject && <IssuesPanel project={selectedProject} />}
      </div>
      <Transition appear show={isEditFormOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setEditFormOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="rounded-lg shadow w-full max-w-md transform overflow-hidden transition-all">
                  <ProjectEditForm
                    project={selectedProject}
                    onCancel={cancelEditForm}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
