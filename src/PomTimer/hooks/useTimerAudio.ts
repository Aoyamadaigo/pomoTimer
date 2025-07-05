import { useRef } from "react";
import { useEffect } from "react";

export const useTimerAudio = (muted: boolean, mode: "focus" | "break", isRunning: boolean) => {
  const focusAudio = useRef(new Audio("/audio/focus.mp3"));
  const breakAudio = useRef(new Audio("/audio/break.mp3"));

  useEffect(() => {
    const focus = focusAudio.current;
    const brk = breakAudio.current;

    if (isRunning) {
      const play = mode === "focus" ? focus : brk;
      const stop = mode === "focus" ? brk : focus;
      stop.pause();
      stop.currentTime = 0;

      play.loop = true;
      play.volume = muted ? 0.0 : 1.0;
      play.play().catch(() => {});
    } else {
      focus.pause();
      brk.pause();
    }
  }, [muted, mode, isRunning]);
};
