import React from 'react';
import { TodosProvider } from "../hooks";

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div>hello</div>
    </TodosProvider>
  )
};
