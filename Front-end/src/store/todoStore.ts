import { create } from 'zustand';
import { Todo } from '../interface/todo.interface';
import api from '../api/axios';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, data: Partial<Omit<Todo, 'id'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearCompletedTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Todo[]>('/todos');
      set({ todos: response.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch todos.', loading: false });
    }
  },

  addTodo: async (title: string) => {
    try {
      const response = await api.post<Todo>('/todos', { title });
      set((state) => ({ todos: [...state.todos, response.data] }));
    } catch (err) {
      set({ error: 'Failed to add todo.' });
    }
  },

  updateTodo: async (id, data) => {
    try {
      const response = await api.put<Todo>(`/todos/${id}`, data);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? response.data : todo
        ),
      }));
    } catch (err) {
      set({ error: 'Failed to update todo.' });
    }
  },

  deleteTodo: async (id: string) => {
    try {
      await api.delete(`/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (err) {
      set({ error: 'Failed to delete todo.' });
    }
  },

  clearCompletedTodos: async () => {
    try {
      await api.post('/todos/clear-completed');
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      }));
    } catch (err) {
      set({ error: 'Failed to clear completed todos.' });
    }
  },
}));