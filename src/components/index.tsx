import React, { Suspense } from 'react';
import { useAuth } from '../contexts';

const L = React.lazy(() => import('./Login'));
const T = React.lazy(() => import('./Todos'));

export const App: React.FC = () => {
  const user = useAuth()

  return (
    <Suspense fallback={null}>
      {!user ? <L /> : <T />}
    </Suspense>
  );
};
