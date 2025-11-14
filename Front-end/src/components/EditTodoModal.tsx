import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSave, FiX } from 'react-icons/fi';
import { Todo } from '../interface/todo.interface';

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
}

const EditTodoModal = ({ todo, onClose, onSave }: EditTodoModalProps) => {
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    if (title.trim()) {
      onSave(todo.id, title.trim());
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl shadow-2xl shadow-purple-300/30 w-full max-w-md p-6 border border-purple-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edit Your Task
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 shadow-sm"
              autoFocus
            />
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/30 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <FiSave />
              <span>Save Changes</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditTodoModal;