import React, { Suspense } from 'react';
import { useAuth } from '../contexts';

const NotAuthenticated = React.lazy(() => import('./Login'));
const Authenticated = React.lazy(() => import('./Todos'));

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={null}>
      {isAuthenticated ? <Authenticated /> : <NotAuthenticated />}
    </Suspense>
  );
};
