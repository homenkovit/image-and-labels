import { useEffect } from "react";

type KeyUpOptions = {
  preventDefault?: boolean,
  stopPropagation?: boolean,
};

export const useKeyUp = (key: string, callback: Function, options?: KeyUpOptions ) => {
  const preventDefault = options?.preventDefault;
  const stopPropagation = options?.stopPropagation;

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener('keyup', onKeyUp, true);

    return () => document.removeEventListener('keyup', onKeyUp, true);
  }, [key, callback]);
};
