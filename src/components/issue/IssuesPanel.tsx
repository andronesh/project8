"use client";

import { Project } from "@/server-actions/projectsActions";
import { useEffect, useState } from "react";
import IssueEditForm from "./IssueEditForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Issue } from "@/types";

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
    const supabase = createClientComponentClient(); // TODO should it be singletone or what?
    supabase
      .from("issues")
      .select("*")
      .match({ project_id: project.id })
      .order("created_at", { ascending: true })
      .then((result) => {
        setIssues(result.data as unknown as Issue[]);
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            {issues?.map((issue: Issue) => (
              <div
                key={issue.id}
                className={`flex flex-row mb-2 px-3 py-1 ${
                  selectedIssue?.id === issue.id
                    ? "bg-blue-900"
                    : "bg-gray-800 hover:bg-gray-700"
                } rounded-lg shadow hover:cursor-pointer`}
                onClick={() => {
                  selectIssue(issue);
                  setEditFormVisible(true);
                }}
              >
                <h2 className={"w-full"}>{issue.title}</h2>
                <span className={"pl-2"}>[{issue.status}]</span>
                <span className={"pl-2"}>[{issue.type}]</span>
              </div>
            ))}
          </div>
        </aside>
        <main role="main" className="w-full px-2 sm:w-1/2 md:w-1/2">
          {editFormVisible && (
            <IssueEditForm
              project={project}
              issue={selectedIssue}
              onSaved={refreshIssuesList}
              onCancel={cancelEditForm}
            />
          )}
        </main>
      </div>
    </div>
  );
}
