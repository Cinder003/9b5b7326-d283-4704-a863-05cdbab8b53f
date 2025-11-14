import { Todo } from '../interface/todo.interface';
import { useTodoStore } from '../store/todoStore';
import { FiEdit, FiTrash2, FiCheckSquare, FiSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, onEdit }: TodoItemProps) => {
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleToggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
    toast.success(`Todo ${!todo.completed ? 'completed' : 'marked as active'}!`);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    toast.error('Todo deleted.');
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <motion.li
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`flex items-center p-4 rounded-xl shadow-lg transition-all duration-300 mb-4 border-l-4 ${
        todo.completed
          ? 'bg-gradient-to-r from-green-100 to-teal-100 border-teal-400'
          : 'bg-white/80 backdrop-blur-sm border-purple-400'
      }`}
    >
      <button onClick={handleToggleComplete} className="mr-4 p-1">
        {todo.completed ? (
          <FiCheckSquare className="text-2xl text-teal-500" />
        ) : (
          <FiSquare className="text-2xl text-purple-500" />
        )}
      </button>
      <span
        className={`flex-grow text-lg ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
        }`}
      >
        {todo.title}
      </span>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
          aria-label="Edit todo"
        >
          <FiEdit size={20} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200"
          aria-label="Delete todo"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </motion.li>
  );
};

export default TodoItem;