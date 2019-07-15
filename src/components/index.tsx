import React from 'react';
import { TodosProvider } from "../hooks";
import { TodoList } from "./TodoList";

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  )
};
