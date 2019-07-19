import React, { useState } from 'react';

import { TodosProvider } from '../contexts';
import { TodoList } from './TodoList';
import { Login } from './Login';
import { useFirebaseAuth } from '../hooks';




export const App: React.FC = () => {
  const user = useFirebaseAuth();
  console.log(user);
  
  return !user ? (
    <Login />
  ) : (
    <TodosProvider>
      <TodoList />
    </TodosProvider>
  );
};
