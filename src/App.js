import React from 'react';
import TodoListApp from './components/TodoListApp';

const App = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Todo List App</h1>
      <TodoListApp />
    </div>
  );
};

export default App;
