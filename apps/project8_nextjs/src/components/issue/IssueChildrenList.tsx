import IssueCompact from "./IssueCompact";
import LoadingSpinner from "../common/LoadingSpinner";
import { useIssueChildren } from "@project8/api-hooks/hooks/useIssueChildren";
import { Issue } from "@project8/domain/types";

type Props = {
	parentId: number;
	onClick: (children: Issue) => void;
};

export default function IssueChildrenList(props: Props) {
	const { data, isFetching, isError } = useIssueChildren(props.parentId);

	if (isFetching) {
		return <LoadingSpinner className="my-2 flex h-8 justify-center" />;
	}

	if (isError) {
		return <div className="rounded-sm bg-red-700 p-2 text-lg text-white">Failed to fetch issue children</div>;
	}

	return (
		<div className="ml-2">
			{data &&
				data.map((children) => (
					<div key={children.id}>
						<div className="border-primary mx-3 border-b"></div>
						<IssueCompact
							issue={children}
							isSelected={false}
							onClick={() => props.onClick(children)}
							className="hover:bg-accent"
						/>
					</div>
				))}
		</div>
	);
}
