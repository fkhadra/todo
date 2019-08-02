import React from 'react';
import { auth, User } from 'firebase';

export interface UseAuth {
  isAuthenticated: boolean;
  getAvatar(): string;
  getName(): string;
}

const AuthContext = React.createContext<UseAuth>({} as UseAuth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [waitingForAuthState, setAuthState] = React.useState(true);

  React.useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setAuthState(false);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (waitingForAuthState) return null;

  const signout = async () => {
    
  };

  const getAvatar = () => {
    return user && user.photoURL ? user.photoURL : '';
  };

  const getName = () => {
    if (user) {
      if (user.displayName) {
        return user.displayName;
      } else if (user.email) {
        return user.email;
      }
    }
    return 'anonymous';
  };

  const contextValue = {
    getAvatar,
    getName,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
