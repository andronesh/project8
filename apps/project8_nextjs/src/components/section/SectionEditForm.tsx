import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import { Section } from "@project8/domain/types";
import { useCreateSectionMutation, useUpdateSectionMutation } from "@project8/api-hooks/hooks/useSectionMutations";

type Props = {
	projectId: number;
	section?: Section | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function SectionEditForm(props: Props) {
	const createSectionMutation = useCreateSectionMutation();
	const updateSectionMutation = useUpdateSectionMutation();
	const isSubmitting = createSectionMutation.isPending || updateSectionMutation.isPending;

	const [formData, setFormData] = useState({
		id: props.section?.id,
		title: props.section?.title,
		projectId: props.projectId,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		const title = formData.title?.trim();
		if (!title) {
			return;
		}

		const callbacks = {
			onSuccess: (result: Section) => {
				console.info(result);
				props.onDone();
			},
			onError: (error: Error) => {
				console.error("Failed to save section", error);
				window.alert(error.message);
			},
		};

		if (props.section?.id) {
			updateSectionMutation.mutate({ id: props.section.id, title }, callbacks);
		} else {
			createSectionMutation.mutate({ title, projectId: Number(formData.projectId) }, callbacks);
		}
	};

	return (
		<form className="bg-card border-primary w-full space-y-3 rounded-lg border p-3 shadow-sm" onSubmit={handleFormSubmit}>
			<InputTextLabeled
				label={"Title"}
				name={"title"}
				value={formData.title}
				placeholder={"TODO NEXT"}
				onChange={handleChange}
				disabled={isSubmitting}
			/>
			<div className="flex flex-row justify-evenly">
				<button
					type="reset"
					className="hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white disabled:text-gray-400 disabled:hover:bg-transparent"
					onClick={props.onCancel}
					disabled={isSubmitting}
				>
					Cancel
				</button>
				{props.section && (
					<button
						type="button"
						className="flex rounded-sm px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
						disabled // TODO implement deletion
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
	);
}
