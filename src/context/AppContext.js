import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { BUTLER_EVENTS } from '../constants';
import { receiveAllFromMain } from '../utils/electronAPI';
import { useEventDispatch } from './EventContext';

const UPDATE = 'UPDATE';

const AppContext = createContext();

function useAppContext() {
  return useContext(AppContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const updatedState = { ...state };
      if (payload.msg === 'SERVER_STARTED') {
        updatedState.serverStarted = true;
      } else if (payload.msg === 'SERVER_STOPPED') {
        updatedState.serverStarted = false;
      }

      return updatedState;
    }

    default: {
      throw Error(`Unexpected action type in AppContext reducer: '${type}'.`);
    }
  }
}

export function Updater() {
  const { update } = useAppContext();
  const dispatchEvent = useEventDispatch();

  useEffect(() => {
    receiveAllFromMain('SERVER', (event, data) => {
      update(data);
    });

    receiveAllFromMain(BUTLER_EVENTS.STOPPED, () => {
      dispatchEvent(BUTLER_EVENTS.STOPPED);
    });
  }, [update, dispatchEvent]);

  return null;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, { serverStarted: false });

  const update = useCallback(payload => {
    dispatch({ type: UPDATE, payload });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        update,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const { state, update } = useAppContext();
  return [state, update];
}
