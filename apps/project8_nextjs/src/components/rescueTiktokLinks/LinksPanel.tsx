"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import TiktokLinkEditForm from "./TiktokLinkEditForm";
import LoadingSpinner from "../common/LoadingSpinner";
import { TiktokLinkDto } from "@project8/api-hooks/types";
import { useFilteredTiktokLinks } from "@project8/api-hooks/hooks/useTiktokLinkQueries";

export default function LinksPanel() {
	const [recipesOnly, setRecipesOnly] = useState(false);
	const [isEditFormOpen, setEditFormOpen] = useState(false);

	const { data: links, isFetching, isError } = useFilteredTiktokLinks(recipesOnly);

	const initLinkCreation = () => {
		setEditFormOpen(true);
	};

	const cancelEditForm = () => {
		setEditFormOpen(false);
	};

	return (
		<>
			<div className="max-w-xs">
				<div className="m-2 flex justify-between">
					<label className="inline-flex cursor-pointer items-center">
						<input
							type="checkbox"
							checked={recipesOnly}
							onChange={() => setRecipesOnly(!recipesOnly)}
							className="peer sr-only"
						/>
						<div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-hidden after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:rtl:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
						<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Recipes</span>
					</label>
					<button
						className="rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
						onClick={initLinkCreation}
					>
						add new
					</button>
				</div>
				{isFetching && <LoadingSpinner className="my-5 px-20" />}
				{isError && <div className="rounded-sm bg-red-700 p-2 text-lg text-white">Failed to fetch TikTok links</div>}
				{!isFetching &&
					links?.map((link: TiktokLinkDto) => (
						<div key={link.id} className="m-2">
							{link.descriptionImage && <img src={link.descriptionImage} />}
						</div>
					))}
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
								<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg shadow-sm transition-all">
									<TiktokLinkEditForm
										// link={undefined}
										onCancel={cancelEditForm}
										onSaved={() => {
											// TODO show toast alert
											cancelEditForm();
										}}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
