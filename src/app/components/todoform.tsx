'use client';

import { FormEvent } from "react";

interface TodoFormProps {
  editingID:number | null;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  status:boolean;
  setStatus: (val: boolean) => void;
  onSubmit: (e: FormEvent) => void; 
  onReset: () => void; 
}

export default function TodoForm({
  editingID,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  onSubmit,
  onReset
}: TodoFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="title of To-Do task *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500
          dark:bg-gray-800  dark:focus:ring-gray-200 dark:focus:border-gray-200"
        />

      
        <select
          value={status ? "true" : "false"}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 bg-white text-gray-700 dark:text-white shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500
          dark:focus:ring-gray-200 dark:focus:border-gray-200"
        >
          <option value="false">Pending (False)</option>
          <option value="true">Completed (True)</option>
        </select>

        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150  hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500
           dark:bg-gray-800  dark:focus:ring-gray-200 dark:focus:border-gray-200 resize-none"
          rows={2}
        />


        <div className="md:col-span-3 flex space-x-3">
          <button
            type="submit"
            className="bg-gray-600 hover:bg-blend-darken text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-150 hover:scale-[1.03] hover:shadow-md active:scale-95 cursor-pointer"
          >
            {editingID? 'Edit To-Do':'Create To-Do'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm transition-all duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}