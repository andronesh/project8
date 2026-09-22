"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { TiktokLink } from "@/server-actions/tiktokActions";
import TiktokLinkEditForm from "./TiktokLinkEditForm";
import { getTiktokLinks } from "@/database/dao/titoLinksDAO";
import LoadingSpinner from "../common/LoadingSpinner";

export default function LinksPanel() {
	const [isLoading, setIsLoading] = useState(false);
	const [recipesOnly, setRecipesOnly] = useState(false);
	const [linksList, setLinksList] = useState<TiktokLink[]>([]);
	const [isEditFormOpen, setEditFormOpen] = useState(false);

	useEffect(() => {
		fetchLinks();
	}, [recipesOnly]);

	const fetchLinks = () => {
		setIsLoading(true);
		getTiktokLinks(recipesOnly)
			.then(setLinksList)
			.catch((err) => {
				console.error("failed to fetch TT links", err);
			})
			.finally(() => setIsLoading(false));
	};

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
				{isLoading && <LoadingSpinner className="my-5 px-20" />}
				{!isLoading &&
					linksList.map((link: TiktokLink) => (
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
											fetchLinks();
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
