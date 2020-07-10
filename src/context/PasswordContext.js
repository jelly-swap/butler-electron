import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { PASSWORD_ACTION_TYPES } from '../constants';

const PasswordStateContext = createContext();
const PasswordDispatchContext = createContext();

const usePasswordStateContext = () => useContext(PasswordStateContext);
const usePasswordDispatchContext = () => useContext(PasswordDispatchContext);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PASSWORD_ACTION_TYPES.UPDATE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    password: '',
  });

  const updatPassword = useCallback(password => {
    dispatch({ type: PASSWORD_ACTION_TYPES.UPDATE_PASSWORD, payload: password });
  }, []);

  return (
    <PasswordStateContext.Provider value={state}>
      <PasswordDispatchContext.Provider value={updatPassword}>{children}</PasswordDispatchContext.Provider>
    </PasswordStateContext.Provider>
  );
};

export const usePassword = () => {
  const state = usePasswordStateContext();

  return state;
};

export const useUpdatePassword = () => {
  const dispatch = usePasswordDispatchContext();
  return dispatch;
};
