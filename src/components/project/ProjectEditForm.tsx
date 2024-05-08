import {
  Project,
  updateProject,
  createProject,
} from "@/server-actions/projectsActions";
import { useEffect, useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";

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
    <div className="w-full p-4 pt-0 bg-gray-800 border border-gray-700 rounded-lg shadow">
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
        <InputTextLabeled
          label={"Name"}
          name={"name"}
          value={formData.name}
          placeholder={"Bucket List"}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-evenly">
          <button
            type="reset"
            className="flex hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          {project && (
            <button
              type="reset"
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
