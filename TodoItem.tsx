import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDraggedOver: boolean;
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
}

const CheckboxIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, isDraggedOver, ...dragProps }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleAnimationEnd = () => {
    if (isDeleting) {
      onDelete(todo.id);
    }
  };

  return (
    <li
      className={`group flex items-center gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700 transition-all duration-300 cursor-grab active:cursor-grabbing ${
        todo.completed ? 'opacity-50' : ''
      } ${
        isDraggedOver ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
      } ${
        isDeleting ? 'animate-slide-out' : ''
      }`}
      draggable
      {...dragProps}
      onAnimationEnd={handleAnimationEnd}
    >
        <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                todo.completed ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500' : 'border-slate-600 group-hover:border-purple-500'
            }`}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
            {todo.completed && <CheckboxIcon />}
        </button>
      
        <span className={`relative flex-grow transition-colors duration-300 ${todo.completed ? 'text-slate-500' : 'text-slate-200'}`}>
            {todo.text}
            <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1.5px] bg-slate-500 origin-left transition-transform duration-300 ease-in-out ${todo.completed ? 'scale-x-100' : 'scale-x-0'}`} />
        </span>

        <button 
            onClick={handleDelete}
            className="text-slate-600 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
            aria-label="Delete task"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </li>
  );
};

export default TodoItem;