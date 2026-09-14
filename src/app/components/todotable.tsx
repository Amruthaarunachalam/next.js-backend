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
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs tracking-wider">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {todos.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50/60 transition-colors">
              <td className="p-3 text-gray-500 font-mono text-xs">#{t.id}</td>
              <td className="p-3 font-medium text-gray-800">{t.title}</td>
              <td className="p-3 text-gray-600 max-w-xs truncate">
                {t.description || <span className="text-gray-400 font-normal">—</span>}
              </td>
              <td className="p-3">
                {t.status ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pending
                  </span>
                )}
              </td>
              <td className="p-3 text-right">
                <div className="flex items-center justify-end space-x-2">
                  {/* Styled Edit Button */}
                  <button
                    onClick={() => onEdit(t)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-medium rounded-md text-xs transition-colors cursor-pointer"
                  >
                    Edit
                  </button>

                  {/* Styled Delete Button */}
                  <button
                    onClick={() => onDelete(t.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium rounded-md text-xs transition-colors cursor-pointer"
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