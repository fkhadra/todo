import React from 'react';
import { useFirebaseAuth } from '../hooks';

export type UseAuth = firebase.User | null;

const AuthContext = React.createContext<UseAuth>({} as UseAuth);

export const AuthProvider: React.FC = ({ children }) => {
  const { user, waitingForAuthState } = useFirebaseAuth();

  if (waitingForAuthState) return <div>Loading...</div>;


  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
