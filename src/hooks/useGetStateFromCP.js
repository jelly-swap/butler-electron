import { useEffect } from 'react';

export const useGetStateFromCP = (shouldGetState, getState, state) => {
  useEffect(() => {
    if (shouldGetState) {
      getState(state);
    }
  }, [shouldGetState, getState, state]);
};
