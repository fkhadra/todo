import React from 'react';
import { TodosProvider } from '../contexts';
import { TodoList } from "./TodoList";

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  )
};
