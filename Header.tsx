import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Stellar Todos
      </h1>
      <p className="text-slate-400 mt-2">Your universe of tasks, beautifully organized.</p>
    </header>
  );
};

export default Header;
