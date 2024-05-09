"use client";

import { Project } from "@/server-actions/projectsActions";
import { Fragment, useEffect, useState } from "react";
import IssueEditForm from "./IssueEditForm";
import { Issue } from "@/types";
import { getIssuesForProject } from "@/database/dao/issuesDAO";
import IssueCompact from "./IssueCompact";
import LoadingSpinner from "../common/LoadingSpinner";
import { Dialog, Transition } from "@headlessui/react";
import PlusIcon from "../common/icons/PlusIcon";

type Props = {
  project: Project;
};

export default function IssuesPanel({ project }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, selectIssue] = useState<Issue>();
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    refreshIssuesList();
  }, [project]);

  // TODO move to more safe place
  const refreshIssuesList = () => {
    setIsLoading(true);
    setEditFormVisible(false);
    getIssuesForProject(project.id)
      .then((result) => {
        setIssues(result);
      })
      .catch((error) => {
        console.error(`Failed to get issues for "${project.name}"`, error);
      })
      .finally(() => setIsLoading(false));
  };

  const initIssueCreation = () => {
    selectIssue(undefined);
    setEditFormVisible(true);
  };

  const cancelEditForm = () => {
    setEditFormVisible(false);
  };

  return (
    <>
      <div className="w-full">
        <div
          className="flex items-center justify-center align-middle mb-2 pt-2 pb-1 px-2 rounded-lg bg-gray-800 text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
          onClick={() => initIssueCreation()}
        >
          <PlusIcon />
          <p className="text-lg pl-2">New Issue</p>
        </div>
        {isLoading && <LoadingSpinner className="px-20 my-5" />}
        {!isLoading &&
          issues?.map((issue: Issue) => (
            <IssueCompact
              key={issue.id}
              issue={issue}
              isSelected={selectedIssue?.id === issue.id}
              onClick={() => {
                selectIssue(issue);
                setEditFormVisible(true);
              }}
            />
          ))}
      </div>
      <Transition appear show={editFormVisible} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={cancelEditForm}>
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
                  <IssueEditForm
                    project={project}
                    issue={selectedIssue}
                    onSaved={refreshIssuesList}
                    onRemoved={refreshIssuesList}
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
