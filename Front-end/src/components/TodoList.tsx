import { useState, useMemo } from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';
import { Todo } from '../interface/todo.interface';
import { AnimatePresence, motion } from 'framer-motion';
import { FiClipboard, FiTrash } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoList = ({ onEdit }: TodoListProps) => {
  const todos = useTodoStore((state) => state.todos);
  const clearCompletedTodos = useTodoStore((state) => state.clearCompletedTodos);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearCompleted = () => {
    if (completedCount > 0) {
      clearCompletedTodos();
      toast.success('Completed todos cleared!');
    }
  };

  const FilterButton = ({ value, label }: { value: FilterType; label: string }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        filter === value
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-300/50'
          : 'bg-white/50 text-gray-600 hover:bg-white/80'
      }`}
    >
      {label}
    </button>
  );

  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white/50 rounded-2xl shadow-lg border border-white">
        <FiClipboard className="mx-auto text-6xl text-purple-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-700">No tasks yet!</h3>
        <p className="text-gray-500 mt-2">Add a new task above to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 p-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="flex gap-2">
          <FilterButton value="all" label="All" />
          <FilterButton value="active" label="Active" />
          <FilterButton value="completed" label="Completed" />
        </div>
        {completedCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-100/50 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-300"
          >
            <FiTrash />
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
      <ul className="space-y-0">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
          ))}
        </AnimatePresence>
      </ul>
      {filteredTodos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 text-gray-500"
        >
          No {filter} tasks.
        </motion.div>
      )}
    </div>
  );
};

export default TodoList;