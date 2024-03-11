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
    <form action={project ? updateProject : createProject} className="m6-6">
      <input
        type="text"
        id="id"
        name="id"
        value={formData.id}
        className="hidden"
      />
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
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
  );
}
