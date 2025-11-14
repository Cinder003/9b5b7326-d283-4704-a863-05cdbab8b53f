import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { FiPlusCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim());
      setTitle('');
      toast.success('Todo added successfully!');
    } else {
      toast.error('Todo title cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-8">
      <div className="relative flex-grow">
        <FiPlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new vibrant task..."
          className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 shadow-sm placeholder-gray-500"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl shadow-lg shadow-pink-500/30 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/50 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        <FiPlusCircle size={20} />
        <span>Add</span>
      </button>
    </form>
  );
};

export default AddTodoForm;