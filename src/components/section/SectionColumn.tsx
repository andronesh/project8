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
				<div className="flex items-center justify-between">
					<p className="pl-2 text-lg">{props.section?.title}</p>
					<div className="">
						<div
							className="mb-2 flex items-center justify-center rounded-lg px-2 pb-1 pt-1 align-middle text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
							onClick={props.onInitIssueCreation}
						>
							<PlusIcon />
							<p className="pl-2 text-lg">issue</p>
						</div>
					</div>
				</div>
				{isFetching && <LoadingSpinner className="mb-2 flex h-14 justify-around" />}
				{isError && <div className="bg-red-700 text-xl font-bold text-white">Failed to load issues</div>}
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
