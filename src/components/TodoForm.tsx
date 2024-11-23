import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { Todo, ClothingType, AccommodationType, TransportType, ActivityType, PlaceType, EssentialType } from '../types/todo';

interface TodoFormProps {
  onAdd: (
    text: string, 
    destination: string, 
    category: Todo['category'], 
    subCategory: Todo['subCategory'],
    priority: Todo['priority'], 
    dueDate?: Date
  ) => void;
}

const subCategories = {
  clothing: {
    label: 'Clothing Type',
    options: [
      { value: 'dresses', label: 'Dresses' },
      { value: 'tops', label: 'Tops' },
      { value: 'bottoms', label: 'Bottoms (Pants/Skirts)' },
      { value: 'sleepwear', label: 'Sleepwear' },
      { value: 'swimwear', label: 'Swimwear' },
      { value: 'outerwear', label: 'Outerwear' },
      { value: 'undergarments', label: 'Undergarments' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'formal', label: 'Formal Wear' },
      { value: 'casual', label: 'Casual Wear' },
    ]
  },
  accommodation: {
    label: 'Accommodation Type',
    options: [
      { value: 'hotel', label: 'Hotel' },
      { value: 'hostel', label: 'Hostel' },
      { value: 'resort', label: 'Resort' },
      { value: 'apartment', label: 'Apartment' },
      { value: 'homestay', label: 'Homestay' },
      { value: 'camping', label: 'Camping' },
    ]
  },
  transport: {
    label: 'Transport Type',
    options: [
      { value: 'flight', label: 'Flight' },
      { value: 'train', label: 'Train' },
      { value: 'bus', label: 'Bus' },
      { value: 'car-rental', label: 'Car Rental' },
      { value: 'taxi', label: 'Taxi' },
      { value: 'ferry', label: 'Ferry' },
    ]
  },
  activities: {
    label: 'Activity Type',
    options: [
      { value: 'sightseeing', label: 'Sightseeing' },
      { value: 'adventure', label: 'Adventure Activities' },
      { value: 'cultural', label: 'Cultural Activities' },
      { value: 'food-tasting', label: 'Food & Dining' },
      { value: 'shopping', label: 'Shopping' },
      { value: 'relaxation', label: 'Relaxation' },
    ]
  },
  places: {
    label: 'Place Type',
    options: [
      { value: 'landmarks', label: 'Landmarks' },
      { value: 'museums', label: 'Museums' },
      { value: 'parks', label: 'Parks & Nature' },
      { value: 'beaches', label: 'Beaches' },
      { value: 'restaurants', label: 'Restaurants' },
      { value: 'markets', label: 'Markets' },
    ]
  },
  essentials: {
    label: 'Essential Type',
    options: [
      { value: 'footwear', label: 'Footwear' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'toiletries', label: 'Toiletries' },
      { value: 'documents', label: 'Documents' },
      { value: 'medicines', label: 'Medicines' },
      { value: 'accessories', label: 'Travel Accessories' },
    ]
  }
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState<Todo['category']>('essentials');
  const [subCategory, setSubCategory] = useState<Todo['subCategory']>('footwear');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && destination.trim()) {
      onAdd(
        text.trim(),
        destination.trim(),
        category,
        subCategory,
        priority,
        dueDate ? new Date(dueDate) : undefined
      );
      setText('');
      setDestination('');
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Todo['category'];
    setCategory(newCategory);
    setSubCategory(subCategories[newCategory].options[0].value as Todo['subCategory']);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need for your trip?"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(subCategories).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value as Todo['subCategory'])}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {subCategories[category].options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo['priority'])}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="relative">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Add Item
        </button>
      </div>
    </form>
  );
}