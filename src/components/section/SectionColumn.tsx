"use client";

import { useEffect, useState } from "react";
import { Issue, Section } from "@/types";
import { getIssuesForProjectSection } from "@/database/dao/issuesDAO";
import LoadingSpinner from "../common/LoadingSpinner";
import PlusIcon from "../common/icons/PlusIcon";
import IssueCompact from "../issue/IssueCompact";

type Props = {
  projectId: number;
  section?: Section;
  refreshIssuesTrigger: Date;
  onInitIssueCreation: () => void;
  onClickOnIssue: (issue: Issue) => void;
};

export default function SectionColumn(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    refreshIssuesList();
  }, [props.refreshIssuesTrigger]);

  const refreshIssuesList = () => {
    setIsLoading(true);
    getIssuesForProjectSection(
      props.projectId,
      props.section ? props.section.id : null
    )
      .then((result) => {
        setIssues(result);
      })
      .catch((error) => {
        console.error(
          `Failed to get issues for project with id = "${props.projectId}" and section = "${props.section?.title}"`,
          error
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="w-96">
        <div className="flex justify-between items-center">
          <p className="text-lg pl-2">{props.section?.title}</p>
          <div className="">
            <div
              className="flex items-center justify-center align-middle mb-2 pt-1 pb-1 px-2 rounded-lg  text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
              onClick={props.onInitIssueCreation}
            >
              <PlusIcon />
              <p className="text-lg pl-2">issue</p>
            </div>
          </div>
        </div>
        {isLoading && (
          <LoadingSpinner className="flex justify-around mb-2 h-14" />
        )}
        {issues?.map((issue: Issue) => (
          <IssueCompact
            key={issue.id}
            issue={issue}
            isSelected={false}
            onClick={() => props.onClickOnIssue(issue)}
          />
        ))}
      </div>
    </>
  );
}
