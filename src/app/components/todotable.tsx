'use client';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status?: boolean;
}

interface TodoTableProps {
  todos: Todo[];
  onEdit:(todos:Todo)=>void;
  onDelete:(id:number)=>void;
}

export default function TodoTable({ todos, onEdit,onDelete }: TodoTableProps) {
  return (
    <table className="w-full text-left border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          <th className="p-2 border border-gray-300">ID</th>
          <th className="p-2 border border-gray-300">Title</th>
          <th className="p-2 border border-gray-300">Description</th>
          <th className="p-2 border border-gray-300">Status</th>
          <th className="p-2 border border-gray-300">Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((t) => (
          <tr key={t.id} className="border-b border-gray-300">
            <td className="p-2 border border-gray-300">{t.id}</td>
            <td className="p-2 border border-gray-300 font-medium">{t.title}</td>
            <td className="p-2 border border-gray-300">
              {t.description || "—"}
            </td>
            <td className="p-2 border border-gray-300">
              {t.status ? "Completed" : "Pending"}
            </td>
            <td><button onClick={() =>onEdit(t) }
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-sm text-sm  transition-colors cursor-pointer hover:scale-105">
                Edit</button>
            <button onClick={() =>onDelete(t.id)}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded-sm text-sm transition-colors cursor-pointer hover:scale-105">
                Delete
              </button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}