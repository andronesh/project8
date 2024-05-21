import { Project, updateProject, createProject } from "@/server-actions/projectsActions";
import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputCheckbox from "../common/form/InputCheckbox";

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
		try {
			if (project) {
				await updateProject(project.id, formData.name!, formData.bookmarked);
			} else {
				await createProject(formData.name!, formData.bookmarked);
			}
			setIsSubmitting(false);
			onDone();
		} catch (error) {
			setIsSubmitting(false);
			window.alert(error);
		}
	};

	return (
		<div className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 shadow">
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
						className="flex rounded px-4 py-2 font-bold text-white hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					{project && (
						<button
							type="reset"
							className="flex rounded px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
							disabled={isSubmitting}
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						className="flex rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
