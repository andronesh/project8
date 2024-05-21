import { Issue } from "@/types";
import { useEffect, useState } from "react";
import IssueEditForm from "./IssueEditForm";
import { getChildrenIssues } from "@/database/dao/issuesDAO";
import IssueCompact from "./IssueCompact";

type Props = {
	issue: Issue;
	className?: string;
	onEditRequested: () => void;
	onChildrenChanged?: (newChildren: Issue[]) => void;
};

export default function IssueDetailed(props: Props) {
	const [childrenIssues, setChildrenIssues] = useState<Issue[]>([]);

	const [childIssueEditFromVisible, setChildIssueEditFromVisible] = useState(false);
	const [childIssueUA, setChildIssueUA] = useState<Issue>();

	useEffect(() => {
		fetchChildrenIssues();
	}, []);

	const fetchChildrenIssues = () => {
		getChildrenIssues(props.issue.id)
			.then(setChildrenIssues)
			.catch((error) => {
				console.error("Failed to fetch children issues", error);
				window.alert("Failed to fetch children issues");
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
				<div className="flex items-end space-x-2 ">
					<span className={"text-sm text-gray-500"}>{props.issue.status}</span>
					<span className={"text-sm text-gray-500"}>{props.issue.type}</span>
				</div>
				<div className="flex items-end space-x-2">
					<button
						className="flex rounded px-2 py-1 text-sm text-gray-500 hover:bg-blue-700 hover:text-white"
						onClick={props.onEditRequested}
					>
						Edit
					</button>
				</div>
			</div>
			<h3 className={"text-lg"}>{props.issue.title}</h3>
			{props.issue.description && (
				<code className="block overflow-x-scroll whitespace-pre text-sm text-gray-400">
					{props.issue.description}
				</code>
			)}
			<div className="ml-2">
				{childrenIssues.map((children) => (
					<div key={children.id}>
						<div className=" mx-3 border-b border-gray-600"></div>
						<IssueCompact
							issue={children}
							isSelected={childIssueUA?.id === children.id}
							onClick={() => initChildEdition(children)}
						/>
					</div>
				))}
			</div>
			<div className="mt-2 flex flex-col rounded border border-gray-500">
				{!childIssueEditFromVisible && (
					<button
						className="text-md flex w-full justify-center rounded px-2 py-1  text-gray-500 hover:bg-gray-700 hover:text-white"
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
							fetchChildrenIssues();
						}}
						onRemoved={() => {
							hideChildEditForm();
							fetchChildrenIssues();
						}}
						onCancel={hideChildEditForm}
					/>
				)}
			</div>
		</div>
	);
}
