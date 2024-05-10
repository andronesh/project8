"use client";

import Modal from "@/components/common/Modal";
import PlusIcon from "@/components/common/icons/PlusIcon";
import IssueEditForm from "@/components/issue/IssueEditForm";
import SectionColumn from "@/components/section/SectionColumn";
import SectionEditForm from "@/components/section/SectionEditForm";
import { getSectionsForProject } from "@/database/dao/sectionsDAO";
import { Issue, Section } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ProjectPage({ params }: { params: { id: number } }) {
  const [sections, setSections] = useState<Section[]>();
  const queryClient = useQueryClient();

  const [sectionUA, setSectionUA] = useState<Section | undefined>(); // UA = Under Action
  const [sectionEditFormVisible, setSectionEditFormVisible] = useState(false);

  const [issueUA, setIssueUA] = useState<Issue | undefined>(); // UA = Under Action
  const [issueEditFormVisible, setIssueEditFormVisible] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = () => {
    getSectionsForProject(params.id)
      .then(setSections)
      .catch((error) => {
        console.error("Failed to fetch sections", error);
        window.alert(error);
      });
  };

  const initSectionCreation = () => {
    setSectionUA(undefined);
    setSectionEditFormVisible(true);
  };

  const initIssueCreation = (section?: Section) => {
    setIssueUA(undefined);
    setSectionUA(section);
    setIssueEditFormVisible(true);
  };

  const initIssueEdition = (issue: Issue, section?: Section) => {
    setIssueUA(issue);
    setSectionUA(section);
    setIssueEditFormVisible(true);
  };

  const closeModal = () => {
    setSectionEditFormVisible(false);
    setIssueEditFormVisible(false);
  };

  return (
    <div className="flex space-x-2 w-fit">
      <SectionColumn
        projectId={params.id}
        onInitIssueCreation={() => initIssueCreation()}
        onClickOnIssue={initIssueEdition}
      />
      {sections &&
        sections.map((section) => (
          <SectionColumn
            key={section.id}
            projectId={params.id}
            section={section}
            onInitIssueCreation={() => initIssueCreation(section)}
            onClickOnIssue={(issue: Issue) => initIssueEdition(issue, section)}
          />
        ))}
      <div
        className="flex items-center justify-center align-middle w-96 h-48 rounded-lg text-gray-500 border-2 border-dashed border-gray-700 hover:cursor-pointer hover:bg-gray-800 hover:text-gray-400"
        onClick={() => initSectionCreation()}
      >
        <PlusIcon />
        <p className="text-lg pl-2">New Section</p>
      </div>
      <Modal
        isVisible={sectionEditFormVisible || issueEditFormVisible}
        onClose={closeModal}
      >
        {sectionEditFormVisible && (
          <SectionEditForm
            projectId={params.id}
            section={sectionUA}
            onCancel={() => setSectionEditFormVisible(false)}
            onDone={() => {
              setSectionEditFormVisible(false);
              fetchSections();
            }}
          />
        )}
        {issueEditFormVisible && (
          <IssueEditForm
            projectId={params.id}
            section={sectionUA}
            issue={issueUA}
            onCancel={() => setIssueEditFormVisible(false)}
            onSaved={() => {
              setIssueEditFormVisible(false);
              queryClient.invalidateQueries({
                queryKey: [
                  "sectionIssues",
                  params.id,
                  sectionUA ? sectionUA.id : null,
                ],
              });
            }}
            onRemoved={() => {
              setIssueEditFormVisible(false);
              queryClient.invalidateQueries({
                queryKey: [
                  "sectionIssues",
                  params.id,
                  sectionUA ? sectionUA.id : null,
                ],
              });
            }}
          />
        )}
      </Modal>
    </div>
  );
}
