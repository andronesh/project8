import { Issue, createIssue } from "@/server-actions/issuesActions";
import { Project } from "@/server-actions/projectsActions";
import { useEffect, useState } from "react";

type Props = {
  project: Project;
  issue: Issue | undefined;
  onSaved: () => void;
  onCancel: () => void;
};

export default function IssueEditForm(props: Props) {
  const [formData, setFormData] = useState({
    id: props.issue?.id.toString(),
    title: props.issue?.title,
    project_id: props.issue ? props.issue.project_id : props.project.id,
  });

  useEffect(() => {
    setFormData({
      id: props.issue ? props.issue.id.toString() : "",
      title: props.issue ? props.issue.title : "",
      project_id: props.issue ? props.issue.project_id : props.project.id,
    });
  }, [props.issue]);

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveIssue = async () => {
    if (props.issue) {
      // TODO update
    } else {
      const result = await createIssue(formData.title!, formData.project_id);
      if (result) {
        props.onSaved();
      }
    }
  };

  return (
    <div className="w-full max-w-sm p-4 pt-0 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow">
      <div className="space-y-4">
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          className="hidden"
        />
        <input
          type="text"
          id="project_id"
          name="project_id"
          value={formData.project_id}
          className="hidden"
        />
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Init git repo"
            required
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
          {props.issue && (
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
              onClick={() => saveIssue()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
