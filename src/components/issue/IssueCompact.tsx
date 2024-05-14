import { Issue } from "@/types";

type Props = {
  issue: Issue;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
};

export default function IssueCompact(props: Props) {
  return (
    <div
      className={`flex flex-col mb-2 px-3 py-1 ${
        props.isSelected ? "bg-blue-900" : "bg-gray-800 hover:bg-gray-700"
      } rounded-lg shadow hover:cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      <div className={`flex flex-row justify-between items-center`}>
        <h3 className={"text-lg"}>{props.issue.title}</h3>
        <div className="flex flex-col pl-2 items-end self-start">
          <span className={"text-xs text-gray-500"}>{props.issue.status}</span>
          <span className={"text-xs text-gray-500"}>{props.issue.type}</span>
        </div>
      </div>
      {props.issue.description && (
        <div className="text-mg text-gray-400 truncate">
          {props.issue.description}
        </div>
      )}
    </div>
  );
}
