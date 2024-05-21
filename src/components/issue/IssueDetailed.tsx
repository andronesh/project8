import { Issue } from "@/types";

type Props = {
  issue: Issue;
  className?: string;
  onEdit: () => void;
};

export default function IssueDetailed(props: Props) {
  return (
    <div
      className={`flex flex-col p-4 py-3 bg-gray-800 text-left ${props.className}`}
    >
      <div className={`flex flex-row justify-between items-center`}>
        <div className="flex space-x-2 items-end ">
          <span className={"text-sm text-gray-500"}>{props.issue.status}</span>
          <span className={"text-sm text-gray-500"}>{props.issue.type}</span>
        </div>
        <div className="flex space-x-2 items-end">
          <button
            className="flex text-sm text-gray-500 hover:bg-blue-700 hover:text-white py-1 px-2 rounded"
            onClick={props.onEdit}
          >
            Edit
          </button>
        </div>
      </div>
      <h3 className={"text-lg"}>{props.issue.title}</h3>
      {props.issue.description && (
        <code className="block text-sm text-gray-400 whitespace-pre overflow-x-scroll">
          {props.issue.description}
        </code>
      )}
    </div>
  );
}
