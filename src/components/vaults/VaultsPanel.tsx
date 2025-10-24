"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PlusIcon from "../common/icons/PlusIcon";
import LoadingSpinner from "../common/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import { useAllVaultsQuery } from "@/tanstack_query/hooks/useAllVaultsQuery";
import { Vault } from "@/database/dao/vaultsDAO";
import VaultEditForm from "./VaultEditForm";
import VaultInfoCompact from "./VaultDetailsCompact";
import VaultDetailsPanel from "./VaultDetailsPanel";

export default function VaultsPanel() {
	const [selectedVault, selectVault] = useState<Vault>();
	const [isEditFormOpen, setEditFormOpen] = useState(false);

	const queryClient = useQueryClient();
	const { data, isFetching, isError } = useAllVaultsQuery();

	if (isError) {
		return <div className="rounded-sm bg-red-700 p-2 text-lg text-white">Failed to fetch vaults</div>;
	}

	const onAddVault = () => {
		selectVault(undefined);
		setEditFormOpen(true);
	};

	const showEditForm = (vault: Vault) => {
		selectVault(vault);
		setEditFormOpen(true);
	};

	const cancelEditForm = () => {
		setEditFormOpen(false);
	};

	const onVaultSaved = () => {
		setEditFormOpen(false);
		queryClient.invalidateQueries({
			queryKey: ["vaults"],
		});
		selectVault(undefined); // TODO update selectedVault instead of closing panel
	};

	return (
		<div className="flex">
			<div className="flex w-1/4 flex-col">
				<div
					className="mb-2 flex items-center justify-center rounded-lg bg-gray-800 px-2 pb-1 pt-2 align-middle text-gray-500 hover:cursor-pointer hover:bg-gray-700 hover:text-gray-400"
					onClick={() => onAddVault()}
				>
					<PlusIcon />
					<p className="pl-2 text-lg">New Vault</p>
				</div>
				<ul className="relative">
					{isFetching && (
						<div className="absolute bottom-2 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-80">
							<LoadingSpinner className="flex w-3/4 justify-around" />
						</div>
					)}
					{data?.map((vault: Vault) => (
						<VaultInfoCompact
							key={vault.id}
							vault={vault}
							isSelected={selectedVault?.id === vault.id}
							onClick={() => selectVault(vault)}
							className="mb-2"
						/>
					))}
				</ul>
			</div>
			<div className="flex w-3/4 pl-3">
				{selectedVault && (
					<VaultDetailsPanel vault={selectedVault} onEdit={() => showEditForm(selectedVault)} />
				)}
			</div>
			<Transition appear show={isEditFormOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => setEditFormOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg shadow-sm transition-all">
									<VaultEditForm vault={selectedVault} onCancel={cancelEditForm} onDone={onVaultSaved} />
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
