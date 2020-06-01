import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { PORT_ACTION_TYPES } from '../constants';

const ServerPortStateContext = createContext();
const ServerPortDispatchContext = createContext();

const useServerPortStateContext = () => useContext(ServerPortStateContext);
const useServerPortDispatchContext = () => useContext(ServerPortDispatchContext);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PORT_ACTION_TYPES.UPDATE_PORT:
      const { PORT } = payload;

      return {
        ...state,
        PORT,
      };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    PORT: 9000,
  });

  const updatePort = useCallback(serverPort => {
    dispatch({ type: PORT_ACTION_TYPES.UPDATE_PORT, payload: { PORT: serverPort } });
  }, []);

  return (
    <ServerPortStateContext.Provider value={state}>
      <ServerPortDispatchContext.Provider value={updatePort}>{children}</ServerPortDispatchContext.Provider>
    </ServerPortStateContext.Provider>
  );
};

export const useServerPort = () => {
  const state = useServerPortStateContext();
  return state;
};

export const useUpdateServerPort = () => {
  const dispatch = useServerPortDispatchContext();
  return dispatch;
};