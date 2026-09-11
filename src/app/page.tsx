'use client';

import { useState, useEffect, FormEvent } from 'react';
import TodoForm from './components/todoform';
import Modal from './components/modal';
import TodoTable from './components/todotable';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status?:boolean;
}

export default function Dashboard() {
const [isOpen,setIsOpen]=useState(false);
//const [deletingId,setDeletingId]=useState<number | null>(null);

  const [todo, setTodo] = useState<Todo[]>([]);
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<boolean>(false);
  
  

  //const BASE_URL = 'http://127.0.0.1:8000';

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
      console.error('Failed fetching categories:', err);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus(false);
    setIsOpen(false);
  };

  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      status:status
    };

    try {
        await fetch(`/api/todo`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      resetForm();
      setIsOpen(false);
      fetchTodo();
    } catch (err) {
      console.error('Error creating Todo:', err);
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
     onClose={()=>setIsOpen(false)}
     title="create Todo">
      <TodoForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />
      </Modal>

      <div>
        <h4 className="text-xl font-bold mb-4 text-gray-800 uppercase font-sans">To-Do List</h4>
        {todo.length === 0 ? (
          <div className="p-8 bg-white rounded-xl text-center text-gray-500">
            No Task to do right now!.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TodoTable todos={todo}/>
          </div>
        )}
      </div>
    </div>
  );
}