import React, { Suspense } from 'react';
import { useAuth } from '../contexts';

// import { Todos } from './Todos';
// import { Login } from './Login';

const L = React.lazy(() => import('./Login'));
const T = React.lazy(() => import('./Todos'));

export const App: React.FC = () => {
  const user = useAuth()
  console.log(user);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!user ? <L /> : <T />}
    </Suspense>
  );
};
