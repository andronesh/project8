"use client";

import { useEffect, useState } from "react";
import { TiktokLink, getTiktokLinks } from "@/server-actions/tiktokActions";

export default function LinksPanel() {
  const [recipesOnly, setRecipesOnly] = useState(false);
  const [linksList, setLinksList] = useState<TiktokLink[]>([]);

  useEffect(() => {
    fetchLinks();
  }, [recipesOnly]);

  const fetchLinks = () => {
    // TODO display loading spinner
    getTiktokLinks(recipesOnly)
      .then(setLinksList)
      .catch((err) => {
        console.error("failed to fetch TT links", err);
      });
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
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Recipes
            </span>
          </label>
        </div>
        {linksList.map((link: TiktokLink) => (
          <div key={link.id} className="m-2">
            <img src={link.descriptionImage} />
          </div>
        ))}
      </div>
    </>
  );
}
