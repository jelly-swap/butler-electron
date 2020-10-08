import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { safeAccess } from '../utils';

const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

const PasswordContext = createContext();

function usePasswordContext() {
  return useContext(PasswordContext);
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD: {
      return { ...state, password: payload };
    }

    default: {
      return state;
    }
  }
};

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, { password: '' });

  const update = useCallback(password => {
    dispatch({ type: UPDATE_PASSWORD, payload: password });
  }, []);

  return (
    <PasswordContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
}

export function usePassword() {
  const { state, update } = usePasswordContext();
  return [safeAccess(state, ['password']), update];
}
