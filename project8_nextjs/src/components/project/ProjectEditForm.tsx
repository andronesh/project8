import { Project } from "@/server-actions/projectsActions";
import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputCheckbox from "../common/form/InputCheckbox";
import { apiClient } from "@/clients/apiClient";

type Props = {
	project: Project | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function ProjectEditForm({ project, onCancel, onDone }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		id: project?.id.toString(),
		name: project?.name,
		bookmarked: project ? project.bookmarked : false,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleCheckboxChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.checked });

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (!formData.name) {
			window.alert("Project name should not be empty!"); // TODO: properly handle validation
			return;
		}
		setIsSubmitting(true);
		const actionPromise = project
			? apiClient.api.projects({ id: project.id }).put({
					name: formData.name!,
					bookmarked: formData.bookmarked,
				})
			: apiClient.api.projects.post({
					name: formData.name!,
					bookmarked: formData.bookmarked,
				});

		const { data, error } = await actionPromise;

		if (data) {
			setIsSubmitting(false);
			onDone();
		}

		if (error) {
			console.error("Failed to submit project form", error);
			setIsSubmitting(false);
			window.alert(JSON.stringify(error)); // TODO: properly handle error
		}
	};

	return (
		<div className="border-primary bg-card w-full rounded-lg border p-4 shadow-sm">
			<form className="space-y-4" onSubmit={handleFormSubmit}>
				<input type="text" id="id" name="id" value={formData.id} className="hidden" readOnly />
				<InputTextLabeled
					label={"Name"}
					name={"name"}
					value={formData.name}
					placeholder={"Bucket List"}
					onChange={handleChange}
					className="flex flex-row items-baseline"
					disabled={isSubmitting}
				/>
				<InputCheckbox
					label={"bookmarked"}
					name={"bookmarked"}
					value={formData.bookmarked}
					onChange={handleCheckboxChange}
					disabled={isSubmitting}
				/>
				<div className="flex flex-row justify-evenly">
					<button
						type="reset"
						className="hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					{project && (
						<button
							type="reset"
							className="flex rounded-sm px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
							disabled={isSubmitting}
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						className="bg-primary hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
