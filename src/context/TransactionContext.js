import Axios from 'axios';
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

import { useApp } from './AppContext';
import { useConfig } from './ConfigContext';

const UPDATE = 'UPDATE';

const TransactionContext = createContext();

function useTransactionContext() {
  return useContext(TransactionContext);
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
      throw Error(`Unexpected action type in TransactionContext reducer: '${type}'.`);
    }
  }
}

export function Updater() {
  const { update } = useTransactionContext();
  const [app] = useApp();
  const trackerUrl = useConfig('TRACKER_URL');
  const wallets = useConfig('WALLETS');

  const login = getLogin(wallets);

  useEffect(() => {
    let stale = false;

    function get() {
      if (!stale) {
        if (app.serverStarted) {
          Axios.get(`https://${trackerUrl}/api/v1/swaps/address/${login}/expiration/1`, {
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
    }, 60000);

    return () => {
      stale = true;
      clearInterval(pricePoll);
    };
  }, [update, app.serverStarted, login, trackerUrl]);

  return null;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  const update = useCallback(balance => {
    dispatch({ type: UPDATE, payload: balance });
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const { state } = useTransactionContext();
  return state;
}

const getLogin = wallets => {
  const addresses = [];
  for (const asset in wallets) {
    const address = wallets[asset].ADDRESS;
    if (address) {
      addresses.push(address);
    }
  }

  return addresses.join(';');
};
