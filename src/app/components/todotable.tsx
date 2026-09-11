'use client';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status?: boolean;
}

interface TodoTableProps {
  todos: Todo[];
}

export default function TodoTable({ todos }: TodoTableProps) {
  return (
    <table className="w-full text-left border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          <th className="p-2 border border-gray-300">ID</th>
          <th className="p-2 border border-gray-300">Title</th>
          <th className="p-2 border border-gray-300">Description</th>
          <th className="p-2 border border-gray-300">Status</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}