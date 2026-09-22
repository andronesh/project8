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
					className={`bg-opacity-70 relative flex w-96 flex-col rounded-lg px-2 ${
						snapshot.isDraggingOver ? "bg-blue-950" : "bg-transparent"
					}`}
					{...provided.droppableProps}
				>
					<div className="flex items-center justify-between">
						<p className="pl-2 text-lg">{props.viewModel.entity?.title}</p>
						<div className="">
							<div
								className="hover:bg-accent mb-2 flex items-center justify-center rounded-lg px-2 pt-1 pb-1 align-middle text-gray-500 hover:cursor-pointer hover:text-gray-300"
								onClick={props.onInitIssueCreation}
							>
								<PlusIcon />
								<p className="pl-2 text-lg">issue</p>
							</div>
						</div>
					</div>
					{props.viewModel.isLoading && (
						<div className="bg-opacity-80 absolute top-0 right-0 bottom-2 left-0 flex items-center justify-center rounded-lg">
							<LoadingSpinner className="flex w-3/4 justify-around" />
						</div>
					)}
					{/* {isError && <div className="text-white bg-red-700 text-xl font-bold">Failed to load issues</div>} */}
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
								className={`mb-0 bg-transparent`}
							/>
						</DraggableWrapper>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}
