"use client";

import { Issue, Section } from "@/types";
import LoadingSpinner from "../common/LoadingSpinner";
import PlusIcon from "../common/icons/PlusIcon";
import IssueCompact from "../issue/IssueCompact";
import { useSectionIssues } from "@/tanstack_query/hooks/useSectionIssues";

type Props = {
	projectId: number;
	section?: Section;
	onInitIssueCreation: () => void;
	onClickOnIssue: (issue: Issue) => void;
};

export default function SectionColumn(props: Props) {
	const { data, isFetching, isError } = useSectionIssues(
		props.projectId,
		props.section ? props.section.id : null,
	);

	return (
		<>
			<div className="w-96">
				<div className="flex justify-between items-center">
					<p className="text-lg pl-2">{props.section?.title}</p>
					<div className="">
						<div
							className="flex items-center justify-center align-middle mb-2 pt-1 pb-1 px-2 rounded-lg text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
							onClick={props.onInitIssueCreation}
						>
							<PlusIcon />
							<p className="text-lg pl-2">issue</p>
						</div>
					</div>
				</div>
				{isFetching && <LoadingSpinner className="flex justify-around mb-2 h-14" />}
				{isError && <div className="text-white bg-red-700 text-xl font-bold">Failed to load issues</div>}
				{data?.map((issue: Issue) => (
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
