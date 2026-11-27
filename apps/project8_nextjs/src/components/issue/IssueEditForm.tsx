import {
	useCreateIssueMutation,
	useDeleteIssueMutation,
	useUpdateIssueMutation,
} from "@project8/api-hooks/hooks/useIssueMutations";
import { Issue, IssueStatus, IssueType, Section } from "@project8/domain/types";
import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputSelectorLabeled from "../common/form/InputSelectorLabeled";
import InputTextareaLabeled from "../common/form/InputTextareaLabeled";
import LoadingSpinner from "../common/LoadingSpinner";

type Props = {
	projectId: number;
	parent?: Issue;
	section?: Section;
	issue: Issue | undefined;
	onSaved: (issue: Issue) => void;
	onRemoved: () => void;
	onCancel: () => void;
};

const deriveIssueType = (issue: Issue | undefined, parent: Issue | undefined): IssueType => {
	if (issue) {
		return issue.type;
	}
	if (parent) {
		return parent.type;
	}
	return IssueType.TASK;
};

const deriveIssueStatus = (issue: Issue | undefined, parent: Issue | undefined): IssueStatus => {
	if (issue) {
		return issue.status;
	}
	if (parent) {
		return parent.status;
	}
	return IssueStatus.CREATED;
};

export default function IssueEditForm(props: Props) {
	const createIssueMutation = useCreateIssueMutation();
	const updateIssueMutation = useUpdateIssueMutation();
	const deleteIssueMutation = useDeleteIssueMutation();
	const isSaving = createIssueMutation.isPending || updateIssueMutation.isPending;
	const isSubmitting = isSaving || deleteIssueMutation.isPending;

	const [formData, setFormData] = useState({
		id: props.issue?.id.toString(),
		type: deriveIssueType(props.issue, props.parent),
		status: deriveIssueStatus(props.issue, props.parent),
		title: props.issue ? props.issue.title : "",
		description: props.issue?.description ? props.issue.description : "",
		projectId: props.issue ? props.issue.projectId : props.projectId,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		const title = formData.title.trim();
		if (!title) {
			window.alert("Issue title should not be empty!"); // TODO: properly handle validation
			return;
		}

		const sharedPayload = {
			type: formData.type,
			status: formData.status,
			title,
			description: formData.description ? formData.description : null,
		};
		const callbacks = {
			onSuccess: (savedIssue: Issue) => props.onSaved(savedIssue),
			onError: (error: Error) => window.alert(error.message),
		};

		if (props.issue) {
			updateIssueMutation.mutate({ id: props.issue.id, ...sharedPayload }, callbacks);
		} else {
			createIssueMutation.mutate(
				{
					...sharedPayload,
					projectId: Number(formData.projectId),
					sectionId: props.section?.id ?? null,
					parentId: props.parent?.id ?? null,
				},
				callbacks
			);
		}
	};

	const removeIssue = () => {
		if (!props.issue) {
			return;
		}

		deleteIssueMutation.mutate(props.issue.id, {
			onSuccess: () => props.onRemoved(),
			onError: (error: Error) => window.alert(error.message),
		});
	};

	return (
		<div className="border-primary bg-card relative w-full rounded-lg border p-4 shadow-sm">
			{isSubmitting && (
				<div className="bg-opacity-80 absolute top-0 right-0 bottom-2 left-0 flex items-center justify-center rounded-lg">
					<LoadingSpinner className="flex w-3/4 justify-around" />
				</div>
			)}
			<form className="space-y-4" onSubmit={handleFormSubmit}>
				<input type="text" id="id" name="id" value={formData.id} className="hidden" readOnly />
				<input type="text" id="projectId" name="projectId" value={formData.projectId} className="hidden" readOnly />
				<InputTextLabeled
					label={"Title"}
					name={"title"}
					value={formData.title}
					placeholder={"Init git repo"}
					onChange={handleChange}
					disabled={isSubmitting}
				/>
				<div className="flex flex-row justify-evenly">
					<InputSelectorLabeled
						label={"Type"}
						name={"type"}
						value={formData.type}
						values={Object.keys(IssueType).filter((key) => {
							return isNaN(Number(key));
						})}
						onChange={handleChange}
					/>
					<InputSelectorLabeled
						label={"Status"}
						name={"status"}
						value={formData.status}
						values={Object.keys(IssueStatus).filter((key) => {
							return isNaN(Number(key));
						})}
						onChange={handleChange}
					/>
				</div>
				<InputTextareaLabeled
					label={"Description"}
					name={"description"}
					value={formData.description}
					onChange={handleChange}
				/>
				<div className="flex flex-row justify-evenly">
					<button
						type="button"
						className="hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white hover:cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={props.onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					{props.issue && (
						<button
							type="button"
							className="flex rounded-sm px-4 py-2 font-bold text-red-400 hover:cursor-pointer hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
							onClick={removeIssue}
							disabled={isSubmitting}
						>
							{deleteIssueMutation.isPending ? "Deleting..." : "Delete"}
						</button>
					)}
					<button
						type="submit"
						className="bg-primary hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white hover:cursor-pointer disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
						disabled={isSubmitting}
					>
						{isSaving ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
