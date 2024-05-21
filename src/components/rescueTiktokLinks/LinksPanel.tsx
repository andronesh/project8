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
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={recipesOnly}
              onChange={() => setRecipesOnly(!recipesOnly)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Recipes</span>
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={initLinkCreation}
          >
            add new
          </button>
        </div>
        {isLoading && <LoadingSpinner className="px-20 my-5" />}
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
                <Dialog.Panel className="rounded-lg shadow w-full max-w-xl transform overflow-hidden transition-all">
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
