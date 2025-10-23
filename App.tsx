import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import ProgressBar from './components/ProgressBar';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('stellar-todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to load todos from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('stellar-todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to local storage", error);
    }
  }, [todos]);

  const handleAddTask = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const handleToggleTask = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleReorderTasks = (reorderedTodos: Todo[]) => {
    setTodos(reorderedTodos);
  };
  
  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const completedCount = useMemo(() => todos.filter(t => t.completed).length, [todos]);
  const totalCount = todos.length;

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <main className="w-full max-w-2xl mx-auto">
        <Header />
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-black/30 p-6 md:p-8">
          <TodoInput onAddTask={handleAddTask} />
          {totalCount > 0 && <ProgressBar total={totalCount} completed={completedCount} />}
          <TodoList
            todos={todos}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onReorder={handleReorderTasks}
          />
          {totalCount > 0 && (
             <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center text-sm text-slate-400">
                <span>{totalCount - completedCount} items left</span>
                <button 
                  onClick={handleClearCompleted}
                  className="hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={completedCount === 0}
                >
                  Clear Completed
                </button>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
