import { useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import { Section } from "@/types";
import { createSection, updateSection } from "@/server-actions/sectionsActions";

type Props = {
	projectId: number;
	section?: Section | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function SectionEditForm(props: Props) {
	const [formData, setFormData] = useState({
		id: props.section?.id,
		title: props.section?.title,
		projectId: props.projectId,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const doSave = async () => {
		if (!formData.title || formData.title.trim().length === 0) {
			return;
		}
		const { result, error } =
			formData.id !== undefined
				? await updateSection(formData.id, formData.title)
				: await createSection(formData.title, formData.projectId);

		if (error) {
			window.alert(error.message);
		} else {
			console.info(result);
			props.onDone();
		}
	};

	return (
		<div className="w-full space-y-3 rounded-lg border border-gray-700 bg-gray-800 p-3 shadow">
			<InputTextLabeled
				label={"Title"}
				name={"title"}
				value={formData.title}
				placeholder={"TODO NEXT"}
				onChange={handleChange}
			/>
			<div className="flex flex-row justify-evenly">
				<button
					type="reset"
					className="flex rounded px-4 py-2 font-bold text-white hover:bg-gray-700"
					onClick={props.onCancel}
				>
					Cancel
				</button>
				{props.section && (
					<button
						type="reset"
						className="flex rounded px-4 py-2 font-bold text-red-400 hover:bg-red-700 hover:text-white"
						disabled // TODO implement deletion
					>
						Delete
					</button>
				)}
				<button
					className="flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					onClick={doSave}
				>
					Save
				</button>
			</div>
		</div>
	);
}
