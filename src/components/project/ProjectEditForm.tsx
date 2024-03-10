import { saveProject } from "@/server-actions/projectsActions";

export default function ProjectEditForm() {
  return (
    <form action={saveProject} className="m6-6">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
}
