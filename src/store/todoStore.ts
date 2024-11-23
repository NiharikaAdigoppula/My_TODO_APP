import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (
    text: string,
    destination: string,
    category: Todo['category'],
    subCategory: Todo['subCategory'],
    priority: Todo['priority'],
    dueDate?: Date
  ) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (text, destination, category, subCategory, priority, dueDate) =>
        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: new Date(),
              destination,
              category,
              subCategory,
              priority,
              dueDate,
            },
            ...state.todos,
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'trip-todo-storage',
    }
  )
);