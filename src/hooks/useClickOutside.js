import { useEffect } from 'react';

export const useClickOutsideElement = handleClickOutside => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
