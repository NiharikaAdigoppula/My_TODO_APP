import React from 'react';
import { Plane, CheckCircle2 } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodoStore } from './store/todoStore';

function App() {
  const {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    clearCompleted,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">My Trip Todo List</h1>
          </div>
          <p className="text-gray-600">Plan your perfect journey, one task at a time</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <TodoForm onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-600" />
              <span className="text-gray-600">
                {activeTodosCount} items remaining
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
              <button
                onClick={clearCompleted}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Clear completed
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
            {filteredTodos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No travel tasks to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;