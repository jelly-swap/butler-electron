import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { receiveAllFromMain } from '../utils/electronAPI';

const UPDATE = 'UPDATE';

const LoggerContext = createContext();

function useLoggerContext() {
  return useContext(LoggerContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      return [...state, { ...payload, id: uuidv4() }];
    }

    default: {
      throw Error(`Unexpected action type in LoggerContext reducer: '${type}'.`);
    }
  }
}

export function Updater() {
  const { update } = useLoggerContext();

  useEffect(() => {
    receiveAllFromMain('LOGGER', (event, data) => {
      update(data);
    });
  }, [update]);

  return null;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  const update = useCallback(log => {
    dispatch({ type: UPDATE, payload: log });
  }, []);

  return (
    <LoggerContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </LoggerContext.Provider>
  );
}

export function useLogger() {
  const { state, update } = useLoggerContext();
  return [state, update];
}
