'use client';

import { useState, useEffect, FormEvent } from 'react';
import TodoForm from './components/todoform';
import Modal from './components/modal';
import TodoTable from './components/todotable';
import ThemeToggle from './components/themeToggle';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status?: boolean;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [todo, setTodo] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const res = await fetch(`/api/todo`);
      if (res.ok) {
        const data = await res.json();
        setTodo(data);
      }
    } catch (err) {
      console.error('Failed fetching todos:', err);
    }
  };

  const handleEdit = (t: Todo) => {
    setDeletingId(null);
    setEditingId(t.id);
    setTitle(t.title);
    setDescription(t.description || '');
    setStatus(t.status || false);
    setIsOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus(false);
    setEditingId(null);
    setDeletingId(null);
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { title, description, status };

    if (editingId) {
      try {
        await fetch(`/api/todo/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        resetForm();
        fetchTodo();
      } catch (err) {
        console.error('Error Editing Todo:', err);
      }
    } else {
      try {
        await fetch(`/api/todo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        resetForm();
        fetchTodo();
      } catch (err) {
        console.error('Error creating Todo:', err);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setEditingId(null);
    setDeletingId(id);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/todo/${id}`, { method: 'DELETE' });
      resetForm();
      fetchTodo();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  
  const pendingTodos = todo.filter((item) => !item.status);
  const completedTodos = todo.filter((item) => item.status);

  return (
    <div className="space-y-8  max-w-6xl mx-auto">

         <h1 className="text-2xl font-bold dark:text-white text-gray-800 uppercase font-sans text-center">
                Task Dashboard
              </h1>
      

       <div className="flex justify-end">
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-gray-600 text-sm  text-white rounded-md shadow hover:bg-gray-700 transition-all cursor-pointer"
        >
          + Add New Todo
        </button>
       </div>
      {/* Shared Modal */}
      <Modal
        isOpen={isOpen}
        onClose={resetForm}
        title={deletingId ? 'Delete Todo' : editingId ? 'Edit Todo' : 'Add Todo'}
      >
        {deletingId ? (
          <div>
            <p>Are you sure you want to delete this Task?</p>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
              >
                Confirm
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <TodoForm
            editingID={editingId}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        )}
      </Modal>

      {/* Pending Tasks */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-700 uppercase tracking-wide dark:text-white">
          Pending Tasks ({pendingTodos.length})
        </h3>
        {pendingTodos.length === 0 ? (
          <div className="p-6 bg-white rounded-lg border border-gray-200 text-center text-gray-500 text-sm">
            No pending tasks!
          </div>
        ) : (
          <TodoTable
            todos={pendingTodos}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      {/*  Completed Tasks */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-emerald-700 uppercase tracking-wide dark:text-green-400">
          Completed Tasks ({completedTodos.length})
        </h3>
        {completedTodos.length === 0 ? (
          <div className="p-6 bg-white rounded-lg border border-gray-200 text-center text-gray-500 text-sm">
            No completed tasks yet.
          </div>
        ) : (
          <TodoTable
            todos={completedTodos}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>
    </div>
  );
}