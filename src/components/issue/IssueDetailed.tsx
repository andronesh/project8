import { Issue } from "@/types";

type Props = {
	issue: Issue;
	className?: string;
	onEdit: () => void;
};

export default function IssueDetailed(props: Props) {
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
						onClick={props.onEdit}
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
		</div>
	);
}
