"use client";

import Modal from "@/components/common/Modal";
import PlusIcon from "@/components/common/icons/PlusIcon";
import IssueEditForm from "@/components/issue/IssueEditForm";
import SectionColumnDroppable, {
  SectionViewModel,
} from "@/components/section/SectionColumnDroppable";
import SectionEditForm from "@/components/section/SectionEditForm";
import {
  getIssuesForProjectSection,
  updateIssuePosition,
} from "@/database/dao/issuesDAO";
import { getSectionsForProject } from "@/database/dao/sectionsDAO";
import { Issue, Section } from "@/types";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const generateSectionViewModel = (entity?: Section): SectionViewModel => {
  return {
    id: entity ? entity.id : null,
    entity,
    issues: [],
    isLoading: false,
  };
};

export default function ProjectPage({ params }: { params: { id: number } }) {
  const [sections, setSections] = useState<SectionViewModel[]>([]);

  const [fetchIssuesTrigger, setFetchIssuesTrigger] = useState(new Date());

  const [sectionUA, setSectionUA] = useState<Section | undefined>(); // UA = Under Action
  const [sectionEditFormVisible, setSectionEditFormVisible] = useState(false);

  const [issueUA, setIssueUA] = useState<Issue | undefined>(); // UA = Under Action
  const [issueEditFormVisible, setIssueEditFormVisible] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      const newState = [...sections];
      newState.forEach((section) => {
        section.isLoading = true;
        getIssuesForProjectSection(params.id, section.id).then((issues) =>
          setSectionIssues(section.id, issues)
        );
      });
      setSections(newState);
    }
  }, [fetchIssuesTrigger]);

  const fetchSections = () => {
    getSectionsForProject(params.id)
      .then((data) => {
        const allSections = [
          generateSectionViewModel(),
          ...data.map(generateSectionViewModel),
        ];
        setSections(allSections);
        setFetchIssuesTrigger(new Date());
      })
      .catch((error) => {
        console.error("Failed to fetch sections", error);
        window.alert(error);
      });
  };

  const refetchSectionIssues = (sectionId: number | null) => {
    const newState = [...sections];
    const index = newState.findIndex((viewModel) => viewModel.id === sectionId);
    newState[index].isLoading = true;
    setSections(newState);
    getIssuesForProjectSection(params.id, sectionId).then((issues) =>
      setSectionIssues(sectionId, issues)
    );
  };

  const setSectionIssues = (sectionId: number | null, issues: Issue[]) => {
    const sectionIndex = sections?.findIndex(
      (section) => section.id === sectionId
    );
    const newState = [...sections];
    newState[sectionIndex].isLoading = false;
    newState[sectionIndex].issues = issues;
    setSections(newState);
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

  function onDragEnd({ source, destination, draggableId }: DropResult) {
    if (!destination) {
      return;
    }
    const sourceSectionIndex = +source.droppableId;
    const destinationSectionIndex = +destination.droppableId;
    const sourceIssueIndex = source.index;
    const destinationIssueIndex = destination.index;

    const destinationSection = sections[destinationSectionIndex];
    const newIssuePosition = calculateNewPosition(
      destinationIssueIndex,
      destinationSection.issues
    );

    if (sourceSectionIndex === destinationSectionIndex) {
      reorderInsideSection(
        newIssuePosition,
        destinationSectionIndex,
        sourceIssueIndex,
        destinationIssueIndex
      );
    } else {
      moveBetweenSections(
        newIssuePosition,
        sourceSectionIndex,
        destinationSectionIndex,
        sourceIssueIndex,
        destinationIssueIndex
      );
    }

    saveNewIssuePosition(+draggableId, newIssuePosition, destinationSection);
  }

  const calculateNewPosition = (index: number, issues: Issue[]): number => {
    if (index === 0) {
      return 0;
    }
    if (index === issues.length) {
      return issues[index - 1].position + 1;
    } else {
      return issues[index].position + 1;
    }
  };

  const reorderInsideSection = (
    newPosition: number,
    sectionIndex: number,
    removeFromIndex: number,
    placeAtIndex: number
  ) => {
    const newState = [...sections];
    const reorderedIssues = Array.from(newState[sectionIndex].issues);
    const [removed] = reorderedIssues.splice(removeFromIndex, 1);
    removed.position = newPosition;
    reorderedIssues.splice(placeAtIndex, 0, removed);
    for (let i = placeAtIndex + 1; i < reorderedIssues.length; i++) {
      reorderedIssues[i].position = reorderedIssues[i].position + 1;
    }
    newState[sectionIndex].issues = reorderedIssues;
    setSections(newState);
  };

  const moveBetweenSections = (
    newPosition: number,
    fromSectionIndex: number,
    toSectionIndex: number,
    removeFromIndex: number,
    placeAtIndex: number
  ) => {
    const newState = [...sections];
    const sourceReorderedIssues = Array.from(newState[fromSectionIndex].issues);
    const destReorderedIssues = Array.from(newState[toSectionIndex].issues);
    const [removed] = sourceReorderedIssues.splice(removeFromIndex, 1);
    removed.position = newPosition;
    destReorderedIssues.splice(placeAtIndex, 0, removed);
    for (let i = placeAtIndex + 1; i < destReorderedIssues.length; i++) {
      destReorderedIssues[i].position = destReorderedIssues[i].position + 1;
    }
    newState[fromSectionIndex].issues = sourceReorderedIssues;
    newState[toSectionIndex].issues = destReorderedIssues;
    setSections(newState);
  };

  const saveNewIssuePosition = (
    issueId: number,
    newPosition: number,
    section: SectionViewModel
  ) => {
    updateIssuePosition(
      issueId,
      newPosition,
      section.entity ? section.entity.id : null,
      section.entity ? section.entity.title : null
    ).then((result) => {
      // TODO show toast
    });
  };

  return (
    <div className="flex space-x-2 w-fit">
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section, index) => (
          <SectionColumnDroppable
            key={section.id}
            projectId={params.id}
            viewModel={section}
            droppableId={index + ""}
            onInitIssueCreation={() => initIssueCreation(section.entity)}
            onClickOnIssue={(issue: Issue) =>
              initIssueEdition(issue, section.entity)
            }
          />
        ))}
      </DragDropContext>
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
              fetchSections(); // TODO just add to array without refetching all
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
              refetchSectionIssues(sectionUA ? sectionUA.id : null);
            }}
            onRemoved={() => {
              setIssueEditFormVisible(false);
              refetchSectionIssues(sectionUA ? sectionUA.id : null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
