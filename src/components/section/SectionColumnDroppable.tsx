"use client";

import { Issue, Section } from "@/types";
import LoadingSpinner from "../common/LoadingSpinner";
import PlusIcon from "../common/icons/PlusIcon";
import IssueCompact from "../issue/IssueCompact";
import { DraggableWrapper } from "../common/drag-and-drop/DraggableWrapper";

import { Droppable } from "@hello-pangea/dnd";

export type SectionViewModel = {
  id: number | null;
  entity?: Section;
  issues: Issue[];
  isLoading: boolean;
};

type Props = {
  projectId: number;
  viewModel: SectionViewModel;
  droppableId: string;
  onInitIssueCreation: () => void;
  onClickOnIssue: (issue: Issue) => void;
};

export default function SectionColumnDroppable(props: Props) {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`flex flex-col relative px-2 w-96 rounded-lg bg-opacity-70 ${
            snapshot.isDraggingOver ? "bg-blue-950" : "bg-transparent"
          }`}
          {...provided.droppableProps}
        >
          <div className="flex justify-between items-center">
            <p className="text-lg pl-2">{props.viewModel.entity?.title}</p>
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
          {props.viewModel.isLoading && (
            <div className="flex justify-center items-center absolute top-0 right-0 left-0 bottom-2 bg-gray-800 bg-opacity-80 rounded-lg">
              <LoadingSpinner className="flex justify-around w-3/4" />
            </div>
          )}
          {/* {isError && (
            <div className="text-white bg-red-700 text-xl font-bold">
              Failed to load issues
            </div>
          )} */}
          {props.viewModel.issues?.map((issue: Issue, index: number) => (
            <DraggableWrapper
              key={issue.id}
              draggableId={issue.id.toString()}
              index={index}
              className={`my-1 rounded-lg`}
            >
              <IssueCompact
                issue={issue}
                isSelected={false}
                onClick={() => props.onClickOnIssue(issue)}
                className={` bg-transparent mb-0`}
              />
            </DraggableWrapper>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
