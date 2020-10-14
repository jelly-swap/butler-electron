import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { DEFAULT_CONFIG } from '../constants';
import { safeAccess } from '../utils';

const UPDATE = 'UPDATE';

const ConfigContext = createContext();

function useConfigContext() {
  return useContext(ConfigContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      console.log('STATE UPDATE', {
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      throw Error(`Unexpected action type in ConfigContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_CONFIG);

  const update = useCallback(config => {
    dispatch({ type: UPDATE, payload: config });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useButlerConfig() {
  const { state, update } = useConfigContext();
  return [state, update];
}

export function useConfig(...args) {
  const { state } = useConfigContext();
  return safeAccess(state, [...args]);
}
