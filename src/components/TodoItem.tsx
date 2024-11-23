import React, { useState } from 'react';
import { Trash2, Edit, Check, X, MapPin, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, { text: editText });
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const categoryIcons = {
    accommodation: '🏨',
    transport: '✈️',
    activities: '🎯',
    essentials: '🎒',
    clothing: '👕',
    places: '🗺️',
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="p-1 text-green-600 hover:text-green-700"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex-1 flex items-center gap-3">
          <span className="text-xl" role="img" aria-label={todo.category}>
            {categoryIcons[todo.category]}
          </span>
          <div className="flex-1">
            <span
              className={`block ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.text}
            </span>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{todo.destination}</span>
              <span className="text-blue-600">({todo.subCategory})</span>
              {todo.dueDate && (
                <>
                  <Calendar size={14} className="ml-2" />
                  <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
        </div>
      )}

      {!isEditing && (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-600 hover:text-gray-700"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-gray-600 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}