import {
  Project,
  updateProject,
  createProject,
} from "@/server-actions/projectsActions";
import { useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputCheckbox from "../common/form/InputCheckbox";

type Props = {
  project: Project | undefined;
  onCancel: () => void;
};

export default function ProjectEditForm({ project, onCancel }: Props) {
  const [formData, setFormData] = useState({
    id: project?.id.toString(),
    name: project?.name,
    bookmarked: project?.bookmarked,
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.checked });

  return (
    <div className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg shadow">
      <form
        className="space-y-4"
        action={project ? updateProject : createProject}
      >
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          className="hidden"
          readOnly
        />
        <InputTextLabeled
          label={"Name"}
          name={"name"}
          value={formData.name}
          placeholder={"Bucket List"}
          onChange={handleChange}
          className="flex flex-row items-baseline"
        />
        <InputCheckbox
          label={"bookmarked"}
          name={"bookmarked"}
          value={formData.bookmarked}
          onChange={handleCheckboxChange}
        />
        <div className="flex flex-row justify-evenly">
          <button
            type="button"
            className="flex hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          {project && (
            <button
              type="button"
              className="flex text-red-400 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
