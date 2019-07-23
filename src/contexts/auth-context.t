import React from 'react';
import { useFirebaseAuth } from '../hooks';

const AuthContext = React.createContext();

function AuthProvider(){
  const {user, canRender} = useFirebaseAuth();
}