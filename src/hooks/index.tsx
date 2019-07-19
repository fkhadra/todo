import React, { useState, useEffect, useRef } from 'react';
import { auth, User } from 'firebase';

export function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value.trimStart());
  }

  function clearInput() {
    setValue('');
  }

  return {
    inputValue: value,
    onInputChange,
    clearInput
  };
}

export function useToggle(initialState = false) {
  const [isToggled, setState] = useState(initialState);

  function toggle(state?: boolean) {
    if (typeof state === 'boolean') {
      setState(state);
      return;
    }
    setState(!isToggled);
  }

  return {
    isToggled,
    toggle
  };
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });
    return () => unregisterAuthObserver();
  }, []);

  return user;
}
