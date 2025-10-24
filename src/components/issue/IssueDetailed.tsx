import { Issue } from "@/types";
import { useState } from "react";
import IssueEditForm from "./IssueEditForm";
import IssueChildrenList from "./IssueChildrenList";
import { useQueryClient } from "@tanstack/react-query";
import { issueChildrenQuery } from "@/tanstack_query/keys";

type Props = {
	issue: Issue;
	className?: string;
	onEditRequested: () => void;
	onChildrenChanged?: (newChildren: Issue[]) => void;
};

export default function IssueDetailed(props: Props) {
	const queryClient = useQueryClient();

	const [childIssueEditFromVisible, setChildIssueEditFromVisible] = useState(false);
	const [childIssueUA, setChildIssueUA] = useState<Issue>();

	const refetchChildrenIssues = () => {
		queryClient.invalidateQueries({
			queryKey: issueChildrenQuery(props.issue.id),
		});
	};

	const initChildCreation = () => {
		setChildIssueUA(undefined);
		setChildIssueEditFromVisible(true);
	};

	const initChildEdition = (child: Issue) => {
		setChildIssueUA(child);
		setChildIssueEditFromVisible(true);
	};

	const hideChildEditForm = () => {
		if (childIssueUA) {
			setChildIssueUA(undefined);
		}
		setChildIssueEditFromVisible(false);
	};

	return (
		<div className={`flex flex-col bg-gray-800 p-4 py-3 text-left ${props.className}`}>
			<div className={`flex flex-row items-center justify-between`}>
				<div className="flex items-end space-x-2">
					<span className={"text-sm text-gray-500"}>{props.issue.status}</span>
					<span className={"text-sm text-gray-500"}>{props.issue.type}</span>
				</div>
				<div className="flex items-end space-x-2">
					<button
						className="flex rounded-sm px-2 py-1 text-sm text-gray-500 hover:bg-blue-700 hover:text-white"
						onClick={props.onEditRequested}
					>
						Edit
					</button>
				</div>
			</div>
			<h3 className={"text-lg"}>{props.issue.title}</h3>
			{props.issue.description && (
				<code className="block overflow-x-scroll text-sm whitespace-pre text-gray-400">
					{props.issue.description}
				</code>
			)}
			<IssueChildrenList parentId={props.issue.id} onClick={initChildEdition} />
			<div className="mt-2 flex flex-col rounded-sm border border-gray-500">
				{!childIssueEditFromVisible && (
					<button
						className="text-md flex w-full justify-center rounded-sm px-2 py-1 text-gray-500 hover:bg-gray-700 hover:text-white"
						onClick={initChildCreation}
					>
						add child issue
					</button>
				)}
				{childIssueEditFromVisible && (
					<IssueEditForm
						projectId={props.issue.projectId}
						issue={childIssueUA}
						parent={props.issue}
						onSaved={(issue: Issue) => {
							hideChildEditForm();
							refetchChildrenIssues();
						}}
						onRemoved={() => {
							hideChildEditForm();
							refetchChildrenIssues();
						}}
						onCancel={hideChildEditForm}
					/>
				)}
			</div>
		</div>
	);
}
