import {
  Project,
  updateProject,
  createProject,
} from "@/server-actions/projectsActions";
import { useEffect, useState } from "react";

type Props = {
  project: Project | undefined;
  onCancel: () => void;
};

export default function ProjectEditForm({ project, onCancel }: Props) {
  const [formData, setFormData] = useState({
    id: project?.id.toString(),
    name: project?.name,
  });

  useEffect(() => {
    setFormData({
      id: project ? project.id.toString() : "",
      name: project ? project.name : "",
    });
  }, [project]);

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="w-full max-w-sm p-4 pt-0 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow">
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
        />
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Bucket List"
            required
          />
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex">
            <button
              type="reset"
              className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          {project && (
            <div className="flex">
              <button
                type="reset"
                className="w-full text-red-400 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          )}
          <div className="flex">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
