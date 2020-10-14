import Axios from 'axios';
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

import { useApp } from './AppContext';
import { useConfig } from './ConfigContext';

const UPDATE = 'UPDATE';

const BalanceContext = createContext();

function useBalanceContext() {
  return useContext(BalanceContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      throw Error(`Unexpected action type in BalanceContext reducer: '${type}'.`);
    }
  }
}

export function Updater() {
  const { update } = useBalanceContext();
  const [app] = useApp();
  const config = useConfig('SERVER');

  useEffect(() => {
    let stale = false;

    function get() {
      if (!stale) {
        if (app.serverStarted) {
          Axios.get(`http://localhost:${config.PORT}/api/v1/balanceAll`, {
            headers: { 'Access-Control-Allow-Origin': '*' },
          }).then(result => {
            update(result.data);
          });
        }
      }
    }

    get();

    const pricePoll = setInterval(() => {
      get();
    }, 15000);

    return () => {
      stale = true;
      clearInterval(pricePoll);
    };
  }, [update, app.serverStarted, config.PORT]);

  return null;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  const update = useCallback(balance => {
    dispatch({ type: UPDATE, payload: balance });
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const { state } = useBalanceContext();
  return state;
}
