"use client";

import { Project } from "@/server-actions/projectsActions";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import IssuesPanel from "../issue/IssuesPanel";
import ProjectEditForm from "./ProjectEditForm";
import NavSidebar from "../common/NavSidebar";

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
    <>
      <NavSidebar
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelected={selectProject}
        onProjectEditRequest={showEditForm}
        onProjectCreationRequest={initProjectCreation}
      />
      <div className="p-4 sm:ml-64 h-screen">
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
    </>
  );
}
