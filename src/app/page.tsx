'use client';

import { useState, useEffect, FormEvent } from 'react';
import TodoForm from './components/todoform';
import Modal from './components/modal';
import TodoTable from './components/todotable';

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
  // Form states
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

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800 uppercase font-sans text-center">
          To-Do
        </h2>
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-gray-400 text-sm text-white rounded-sm overflow-hidden shadow-md hover:bg-gray-500 cursor-pointer hover:scale-95 transition-transform"
        >
          + Add new Todo
        </button>
      </div>

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
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer hover:scale-105"
              >
                Confirm
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer hover:scale-105"
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

      <div>
        <h4 className="text-xl font-bold mb-4 text-gray-800 uppercase font-sans">
          To-Do List
        </h4>
        {todo.length === 0 ? (
          <div className="p-8 bg-white rounded-xl text-center text-gray-500">
            No Task to do right now!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TodoTable todos={todo} onEdit={handleEdit} onDelete={handleDeleteClick} />
          </div>
        )}
      </div>
    </div>
  );
}