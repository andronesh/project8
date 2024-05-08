import { deleteIssue } from "@/database/dao/issuesDAO";
import { createIssue, updateIssue } from "@/server-actions/issuesActions";
import { Project } from "@/server-actions/projectsActions";
import { Issue, IssueStatus, IssueType } from "@/types";
import { useState } from "react";
import InputTextLabeled from "../common/form/InputTextLabeled";
import InputSelectorLabeled from "../common/form/InputSelectorLabeled";
import InputTextareaLabeled from "../common/form/InputTextareaLabeled";

type Props = {
  project: Project;
  issue: Issue | undefined;
  onSaved: () => void;
  onRemoved: () => void;
  onCancel: () => void;
};

export default function IssueEditForm(props: Props) {
  const [formData, setFormData] = useState({
    id: props.issue?.id.toString(),
    type: props.issue ? props.issue.type : IssueType.TASK,
    status: props.issue ? props.issue.status : IssueStatus.CREATED,
    title: props.issue?.title,
    description: props.issue?.description ? props.issue.description : "",
    projectId: props.issue ? props.issue.projectId : props.project.id,
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveIssue = async () => {
    if (props.issue) {
      const result = await updateIssue(
        props.issue.id,
        formData.type,
        formData.status,
        formData.title!,
        formData.description ? formData.description : null
      );
      if (result) {
        props.onSaved();
      }
    } else {
      const result = await createIssue(
        formData.type,
        formData.status,
        formData.title!,
        formData.description ? formData.description : null,
        formData.projectId
      );
      if (result) {
        props.onSaved();
      }
    }
  };

  const removeIssue = async () => {
    if (props.issue) {
      const result = await deleteIssue(props.issue.id);
      if (result) {
        props.onRemoved();
      }
    }
  };

  return (
    <div className="w-full p-4 pt-0 bg-gray-800 border border-gray-700 rounded-lg shadow">
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
          id="projectId"
          name="projectId"
          value={formData.projectId}
          className="hidden"
        />
        <InputTextLabeled
          label={"Title"}
          name={"title"}
          value={formData.title}
          placeholder={"Init git repo"}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-evenly">
          <InputSelectorLabeled
            label={"Type"}
            name={"type"}
            value={formData.type}
            values={Object.keys(IssueType).filter((key) => {
              return isNaN(Number(key));
            })}
            onChange={handleChange}
          />
          <InputSelectorLabeled
            label={"Status"}
            name={"status"}
            value={formData.status}
            values={Object.keys(IssueStatus).filter((key) => {
              return isNaN(Number(key));
            })}
            onChange={handleChange}
          />
        </div>
        <InputTextareaLabeled
          label={"Description"}
          name={"description"}
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-evenly">
          <button
            type="reset"
            className="flex hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          {props.issue && (
            <button
              className="flex text-red-400 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded"
              onClick={removeIssue}
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => saveIssue()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
