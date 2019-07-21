import React, { Suspense } from 'react';

// import { Todos } from './Todos';
// import { Login } from './Login';
import { useFirebaseAuth } from '../hooks';

const L = React.lazy(() => import('./Login'));
const T = React.lazy(() => import('./Todos'));

export const App: React.FC = () => {
  const { user, canRender } = useFirebaseAuth();
  console.log(user);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {canRender && (!user ? <L /> : <T />)}
    </Suspense>
  );
};
