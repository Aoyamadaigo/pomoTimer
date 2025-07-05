import { useRef } from "react";
import { useEffect } from "react";

export const useTimerInterval = (isRunning: boolean, onTick: () => void) => {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && !ref.current) {
      ref.current = window.setInterval(onTick, 1000);
    } else if (!isRunning && ref.current) {
      clearInterval(ref.current);
      ref.current = null;
    }

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [isRunning]);
};
