import { Project } from "@project8/domain/types";
import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputCheckbox from "../common/form/InputCheckbox";
import { useCreateProjectMutation, useUpdateProjectMutation } from "@project8/api-hooks/hooks/useProjectMutations";

type Props = {
	project: Project | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function ProjectEditForm({ project, onCancel, onDone }: Props) {
	const createProjectMutation = useCreateProjectMutation();
	const updateProjectMutation = useUpdateProjectMutation();
	const isSubmitting = createProjectMutation.isPending || updateProjectMutation.isPending;

	const [formData, setFormData] = useState({
		id: project?.id.toString(),
		name: project?.name,
		bookmarked: project ? project.bookmarked : false,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleCheckboxChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.checked });

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		const name = formData.name?.trim();
		if (!name) {
			window.alert("Project name should not be empty!"); // TODO: properly handle validation
			return;
		}

		const payload = {
			name,
			bookmarked: formData.bookmarked,
		};
		const callbacks = {
			onSuccess: () => onDone(),
			onError: (error: Error) => {
				console.error("Failed to submit project form", error);
				window.alert(error.message); // TODO: properly handle error
			},
		};

		if (project) {
			updateProjectMutation.mutate({ id: project.id, ...payload }, callbacks);
		} else {
			createProjectMutation.mutate(payload, callbacks);
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
