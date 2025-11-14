import { useEffect, useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import { useTodoStore } from '../store/todoStore';
import { Todo } from '../interface/todo.interface';
import EditTodoModal from '../components/EditTodoModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { fetchTodos, updateTodo, loading, error } = useTodoStore();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCloseModal = () => {
    setEditingTodo(null);
  };

  const handleSave = (id: string, title: string) => {
    updateTodo(id, { title });
    setEditingTodo(null);
    toast.success('Todo updated!');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-200/50 p-6 sm:p-8 border border-white">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent pb-2">
            Vibrant Todo List
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Organize your life with a splash of color!</p>
        </header>

        <AddTodoForm />

        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        
        {!loading && !error && (
          <TodoList onEdit={handleEdit} />
        )}
      </div>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
      
      <footer className="text-center mt-8 text-gray-500/80">
        <p>Built with ❤️ and vibrant gradients.</p>
      </footer>
    </div>
  );
};

export default HomePage;