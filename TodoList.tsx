import React, { useRef, useState } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (reorderedTodos: Todo[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onReorder }) => {
  const draggedItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null);


  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    draggedItemIndex.current = index;
    // For a better visual drag effect
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number, id: string) => {
    dragOverItemIndex.current = index;
    setDraggedOverId(id);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    // Only clear if we're leaving for real, not just entering a child
    if (e.relatedTarget && (e.currentTarget as Node).contains(e.relatedTarget as Node)) return;
    setDraggedOverId(null);
  };

  const handleDragEnd = () => {
    if (draggedItemIndex.current !== null && dragOverItemIndex.current !== null && draggedItemIndex.current !== dragOverItemIndex.current) {
      const newTodos = [...todos];
      const [reorderedItem] = newTodos.splice(draggedItemIndex.current, 1);
      newTodos.splice(dragOverItemIndex.current, 0, reorderedItem);
      onReorder(newTodos);
    }
    draggedItemIndex.current = null;
    dragOverItemIndex.current = null;
    setDraggedOverId(null);
  };

  if (todos.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-slate-500">Your task list is a blank canvas.</p>
            <p className="text-slate-400 mt-1">Time to create a masterpiece!</p>
        </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          isDraggedOver={draggedOverId === todo.id}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index, todo.id)}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        />
      ))}
    </ul>
  );
};

export default TodoList;
