'use client';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status?: boolean;
}

interface TodoTableProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoTable({ todos, onEdit, onDelete }: TodoTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold uppercase text-xs tracking-wider">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {todos.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
              <td className="p-3 text-gray-500 dark:text-gray-400 font-mono text-xs">#{t.id}</td>
              <td className="p-3 font-medium text-gray-800 dark:text-gray-100">{t.title}</td>
              <td className="p-3 text-gray-600 dark:text-gray-300">
                {t.description || <span className="text-gray-400 dark:text-gray-500 font-normal">—</span>}
              </td>
              <td className="p-3">
                {t.status ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    Pending
                  </span>
                )}
              </td>
              <td className="p-3 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(t)}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium rounded text-xs transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="px-3 py-1 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 font-medium rounded text-xs transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}