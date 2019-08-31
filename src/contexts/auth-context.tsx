import React from 'react';
import { auth, User } from 'firebase';

export interface UserInfo {
  id: string;
  avatar: string;
  name: string;
}

export interface UseAuth {
  isAuthenticated: boolean;
  user: UserInfo;
  signOut(): void;
}

const AuthContext = React.createContext<UseAuth>({} as UseAuth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>();
  const [waitingForAuthState, setAuthState] = React.useState(true);
  let userInfo: UserInfo;

  React.useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setAuthState(false);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (waitingForAuthState) return null;

  const signOut = async () => {
    await auth().signOut();
  };

  if (user) {
    userInfo = {
      id: user.uid,
      avatar: user.photoURL ? user.photoURL : '',
      name: user.displayName || user.email!
    };
  }

  const contextValue = {
    user: userInfo!,
    isAuthenticated: !!user,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
