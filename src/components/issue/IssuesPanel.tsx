"use client";

import { Project } from "@/server-actions/projectsActions";
import { useEffect, useState } from "react";
import IssueEditForm from "./IssueEditForm";
import { Issue } from "@/types";
import { getIssuesForProject } from "@/database/dao/issuesDAO";
import IssueCompact from "./IssueCompact";

type Props = {
  project: Project;
};

export default function IssuesPanel({ project }: Props) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, selectIssue] = useState<Issue>();
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    refreshIssuesList();
  }, [project]);

  // TODO move to more safe place
  const refreshIssuesList = () => {
    setEditFormVisible(false);
    getIssuesForProject(project.id)
      .then((result) => {
        setIssues(result);
      })
      .catch((error) => {
        console.error(`Failed to get issues for "${project.name}"`, error);
      });
  };

  const initIssueCreation = () => {
    selectIssue(undefined);
    setEditFormVisible(true);
  };

  const cancelEditForm = () => {
    setEditFormVisible(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row flex-wrap">
        <aside className="w-full px-2 sm:w-1/2 md:w-1/2">
          <div className="sticky top-0 w-full">
            <div
              className="flex items-center justify-center mb-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:cursor-pointer hover:bg-gray-700"
              onClick={() => initIssueCreation()}
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
            {issues?.map((issue: Issue) => (
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
        </aside>
        <main role="main" className="w-full px-2 sm:w-1/2 md:w-1/2">
          {editFormVisible && (
            <IssueEditForm
              project={project}
              issue={selectedIssue}
              onSaved={refreshIssuesList}
              onRemoved={refreshIssuesList}
              onCancel={cancelEditForm}
            />
          )}
        </main>
      </div>
    </div>
  );
}
