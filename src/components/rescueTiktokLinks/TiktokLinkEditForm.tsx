"use client";

import { TiktokLink, insertLink } from "@/server-actions/tiktokActions";
import { useEffect, useState } from "react";
import ImagePasteZone from "./ImagePasteZone";

type Props = {
  link?: TiktokLink | undefined;
  onSaved?: () => void;
  onCancel?: () => void;
};

export default function TiktokLinkEditForm(props: Props) {
  const [formData, setFormData] = useState({
    id: props.link?.id.toString(),
    url: props.link?.url.toString(),
    thumbnail: props.link?.thumbnail.toString(),
    isRecipe: props.link ? props.link.isRecipe : false,
    descriptionImage: props.link?.descriptionImage.toString(),
    tgSavedAt: props.link?.tgSavedAt,
  });

  useEffect(() => {
    setFormData({
      id: props.link?.id.toString(),
      url: props.link?.url.toString(),
      thumbnail: props.link?.thumbnail.toString(),
      isRecipe: props.link ? props.link.isRecipe : false,
      descriptionImage: props.link?.descriptionImage.toString(),
      tgSavedAt: props.link?.tgSavedAt,
    });
  }, [props.link]);

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  const saveLink = async () => {
    if (props.link) {
      // TODO
      alert("Updating is not implemented yet :(");
    } else {
      const result = await insertLink(
        formData.url,
        formData.thumbnail,
        formData.isRecipe,
        formData.descriptionImage,
        formData.tgSavedAt
      );
      if (result) {
        if (props.onSaved) {
          props.onSaved();
        }
      } else {
        console.error("failed to save link", formData);
      }
    }
  };

  return (
    <div className="w-full p-4 pt-0 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow">
      <div className="space-y-4">
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          className="hidden"
        />
        <div>
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="https://..."
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-evenly items-center">
            <label
              htmlFor="type"
              className="p-2.5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Recipe
            </label>
            <input
              checked={formData.isRecipe}
              id="isRecipe"
              name="isRecipe"
              type="checkbox"
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-row justify-evenly items-center">
            <label
              htmlFor="tgSavedAt"
              className="block mr-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              TG saved at
            </label>
            <input
              type="text"
              name="tgSavedAt"
              id="tgSavedAt"
              value={formData.tgSavedAt}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="23.04.22 14:56"
              required
            />
          </div>
        </div>
        <div className="flex flex-row justify-evenly">
          <ImagePasteZone
            name="thumbnain"
            label="Thumbnail"
            onChange={(thumbnail) =>
              setFormData({ ...formData, thumbnail: thumbnail })
            }
            className="flex-1 p-3"
          />

          <ImagePasteZone
            name="descriptionImage"
            label="Description Image"
            onChange={(descriptionImage) =>
              setFormData({ ...formData, descriptionImage: descriptionImage })
            }
            className="flex-1  p-3"
          />
        </div>

        <div className="flex flex-row justify-evenly">
          <div className="flex">
            <button
              type="reset"
              className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </div>
          {props.link && (
            <div className="flex">
              <button className="w-full text-red-400 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          )}
          <div className="flex">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => saveLink()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
