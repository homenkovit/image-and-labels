import { RefObject, useEffect } from "react";

export const useClickOutside = (callback: Function, ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener('click', onClickOutside, true);

    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [callback]);
};
