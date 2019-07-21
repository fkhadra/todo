import React from 'react';

import { Todos } from './Todos';
import { Login } from './Login';
import { useFirebaseAuth } from '../hooks';




export const App: React.FC = () => {
  const user = useFirebaseAuth();
  console.log(user);
  
  return !user ? (
    <Login />
  ) : (
      <Todos />
  );
};
