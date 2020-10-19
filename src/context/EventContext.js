import React, { createContext, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';

const SUBSCRIBE = 'SUBSCRIBE';
const UNSUBSCRIBE = 'UNSUBSCRIBE';

const EventContext = createContext([
  (_event, _cb) => {}, // subscribe
  (_event, _cb) => {}, // unsubscribe
  (_event, _payload) => {}, // dispatch
]);

function useEventContext() {
  return useContext(EventContext);
}

export const useEventDispatch = () => {
  const [, , dispatch] = useEventContext();

  return dispatch;
};

export const useEvent = (event, callback) => {
  const [subscribe, unsubscribe] = useEventContext();

  useEffect(() => {
    subscribe(event, callback);

    return () => unsubscribe(event, callback);
  }, [subscribe, unsubscribe, event, callback]);
};

function reducer(state, action) {
  const { type, event } = action;

  switch (type) {
    case SUBSCRIBE: {
      const { callback } = action;
      if (event in state) {
        if (state[event].includes(callback)) {
          return state;
        }
        return { ...state, [event]: [...state[event], callback] };
      }
      return { ...state, [event]: [callback] };
    }

    case UNSUBSCRIBE: {
      const { callback } = action;
      if (event in state && state[event].includes(callback)) {
        return { ...state, [event]: [...state[event].filter(cb => cb !== callback)] };
      }
      return state;
    }

    default: {
      throw Error(`Unexpected action type in BalanceContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [subscribers, dispatch] = useReducer(reducer, []);

  const subscribe = useCallback(
    (event, callback) => {
      dispatch({ type: SUBSCRIBE, event, callback });
    },
    [dispatch],
  );

  const unsubscribe = useCallback(
    (event, callback) => {
      dispatch({ type: UNSUBSCRIBE, event, callback });
    },
    [dispatch],
  );

  const dispatchEvent = useCallback(
    (event, payload) => {
      if (event in subscribers) {
        subscribers[event].forEach(cb => cb(payload));
      }
    },
    [subscribers],
  );

  const eventPack = useMemo(() => [subscribe, unsubscribe, dispatchEvent], [subscribe, unsubscribe, dispatchEvent]);

  return <EventContext.Provider value={eventPack}>{children}</EventContext.Provider>;
}
