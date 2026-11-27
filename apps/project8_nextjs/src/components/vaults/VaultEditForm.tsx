import { FormEvent, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import { Vault } from "@project8/domain/daos/vaultsDAO";
import { useCreateVaultMutation, useUpdateVaultMutation } from "@project8/api-hooks/hooks/useVaultMutations";
import { v4 } from "uuid";

type Props = {
	vault: Vault | undefined;
	onCancel: () => void;
	onDone: () => void;
};

export default function VaultEditForm({ vault, onCancel, onDone }: Props) {
	const createVaultMutation = useCreateVaultMutation();
	const updateVaultMutation = useUpdateVaultMutation();
	const isSubmitting = createVaultMutation.isPending || updateVaultMutation.isPending;

	const [formData, setFormData] = useState({
		id: vault?.id.toString(),
		name: vault?.name,
		token: vault?.token,
		url: vault?.url,
	});

	const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		const name = formData.name?.trim();
		const token = formData.token?.trim();
		if (!name) {
			window.alert("Vault name should not be empty!"); // TODO: properly handle validation
			return;
		}
		if (!token) {
			window.alert("Vault token should not be empty!"); // TODO: properly handle validation
			return;
		}

		const payload = {
			name,
			token,
			url: formData.url?.trim() || undefined,
		};
		const callbacks = {
			onSuccess: () => onDone(),
			onError: (error: Error) => {
				console.error("Failed to submit vault form", error);
				window.alert(error.message); // TODO: properly handle error
			},
		};

		if (vault) {
			updateVaultMutation.mutate({ id: vault.id, ...payload }, callbacks);
		} else {
			createVaultMutation.mutate(payload, callbacks);
		}
	};

	const generateToken = () => {
		setFormData({
			...formData,
			token: v4(),
		});
	};

	return (
		<div className="bg-card border-primary w-full rounded-lg border p-4 shadow-sm">
			<form className="space-y-4" onSubmit={handleFormSubmit}>
				<input type="text" id="id" name="id" value={formData.id} className="hidden" readOnly />
				<InputTextLabeled
					label={"Name"}
					name={"name"}
					value={formData.name}
					placeholder={"Android app"}
					onChange={handleChange}
					className="flex flex-row items-baseline"
					disabled={isSubmitting}
				/>
				<InputTextLabeled
					label={"URL"}
					name={"url"}
					value={formData.url ? formData.url : undefined}
					placeholder={"URL to connect to..."}
					onChange={handleChange}
					className="flex flex-row items-baseline"
					disabled={isSubmitting}
				/>
				<div className="flex flex-row justify-between">
					<InputTextLabeled
						label={"Token"}
						name={"token"}
						value={formData.token}
						placeholder={"8473ef23-dec6-48d5-a7ba-a4a6589d4ae5"}
						onChange={handleChange}
						className="flex flex-1 flex-row items-baseline"
						disabled={isSubmitting}
					/>
					<button
						type="button"
						className="hover:bg-primary ml-2 flex rounded-sm px-4 py-2 font-bold text-white disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={generateToken}
						disabled={isSubmitting}
					>
						generate
					</button>
				</div>
				<div className="flex flex-row justify-evenly">
					<button
						type="reset"
						className="hover:bg-accent flex rounded-sm px-4 py-2 font-bold text-white hover:cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</button>
					{vault && (
						<button
							type="reset"
							className="flex rounded-sm px-4 py-2 font-bold text-red-400 hover:cursor-pointer hover:bg-red-700 hover:text-white disabled:text-red-900 disabled:hover:bg-transparent"
							disabled={isSubmitting}
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						className="bg-primary hover:bg-accent disabled:bg-sidebar disabled:hover:bg-sidebar flex rounded-sm px-4 py-2 font-bold text-white hover:cursor-pointer disabled:text-gray-400"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
