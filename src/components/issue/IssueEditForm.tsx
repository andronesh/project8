import { deleteIssue } from "@/database/dao/issuesDAO";
import { createIssue, updateIssue } from "@/server-actions/issuesActions";
import { Issue, IssueStatus, IssueType, Section } from "@/types";
import { useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputSelectorLabeled from "../common/form/InputSelectorLabeled";
import InputTextareaLabeled from "../common/form/InputTextareaLabeled";
import LoadingSpinner from "../common/LoadingSpinner";

type Props = {
	projectId: number;
	section?: Section;
	issue: Issue | undefined;
	onSaved: (issue: Issue) => void;
	onRemoved: () => void;
	onCancel: () => void;
};

export default function IssueEditForm(props: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		id: props.issue?.id.toString(),
		type: props.issue ? props.issue.type : IssueType.TASK,
		status: props.issue ? props.issue.status : IssueStatus.CREATED,
		title: props.issue ? props.issue.title : "",
		description: props.issue?.description ? props.issue.description : "",
		projectId: props.issue ? props.issue.projectId : props.projectId,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const saveIssue = async () => {
		setIsSubmitting(true);
		try {
			const savedIssue = props.issue
				? await updateIssue(
						props.issue.id,
						formData.type,
						formData.status,
						formData.title!,
						formData.description ? formData.description : null,
					)
				: await createIssue(
						formData.type,
						formData.status,
						formData.title!,
						formData.description ? formData.description : null,
						formData.projectId,
						props.section,
					);
			setIsSubmitting(false);
			props.onSaved(savedIssue);
		} catch (error) {
			setIsSubmitting(false);
			window.alert(error);
		}
	};

	const removeIssue = async () => {
		if (props.issue) {
			setIsSubmitting(true);
			try {
				await deleteIssue(props.issue.id);
				setIsSubmitting(false);
				props.onRemoved();
			} catch (error) {
				setIsSubmitting(false);
				window.alert(error);
			}
		}
	};

	return (
		<div className="relative w-full rounded-lg border border-gray-700 bg-gray-800 p-4 pt-0 shadow">
			{isSubmitting && (
				<div className="absolute bottom-2 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-80">
					<LoadingSpinner className="flex w-3/4 justify-around" />
				</div>
			)}
			<div className="space-y-4">
				<input type="text" id="id" name="id" value={formData.id} className="hidden" readOnly />
				<input
					type="text"
					id="projectId"
					name="projectId"
					value={formData.projectId}
					className="hidden"
					readOnly
				/>
				<InputTextLabeled
					label={"Title"}
					name={"title"}
					value={formData.title}
					placeholder={"Init git repo"}
					onChange={handleChange}
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
						className="flex rounded px-4 py-2 font-bold text-white hover:bg-gray-700"
						onClick={props.onCancel}
					>
						Cancel
					</button>
					{props.issue && (
						<button
							className="flex rounded px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white"
							onClick={removeIssue}
						>
							Delete
						</button>
					)}
					<button
						className="flex rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600"
						onClick={saveIssue}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
