import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { TimeReducer } from "./TimeReducer";
import { Header } from "./components/organisms/Heder";
import { useColor } from "./colorContext";
import { TimerTemplate } from "./components/templates/TimerTemplate";
import { getTextColorClass } from "./utils/getTimerColor";
import { useTimerAudio } from "./hooks/useTimerAudio";
import { useTimerInterval } from "./hooks/useTimerInterval";
import { useRecordStorage } from "./hooks/useRecordStorage";


// 初期値設定
const initialState = {
  initialTime: "",
  time: "",
  totalTime: 0,
  isRunning: false,
  mode: "focus" as "focus" | "break",
  focusDuration: 25 * 60,
  breakDuration: 5 * 60,
};


export const Main = () => {
  const { color, colorDeep } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [state, dispatch] = useReducer(TimeReducer, initialState);
  const interValidRef = useRef<number | null>(null);

  
  const bgColorClass = useMemo(() => `bg-${color}-${colorDeep}`, [color, colorDeep]);

  const textColorClass = useMemo(() => getTextColorClass(state.mode), [state.mode]);

  useTimerAudio(muted, state.mode, state.isRunning);

  useTimerInterval(state.isRunning, () => dispatch({ type: "TICK" }));

  //タイマーの進行状況管理の値
  //タイマーの動作処理
  useEffect(() => {
    if (state.isRunning && !interValidRef.current) {
      interValidRef.current = setInterval(() => {
        dispatch({ type: "TICK" })

      }, 1000)
    }

    if (!state.isRunning && interValidRef.current) {
      clearInterval(interValidRef.current);
      interValidRef.current = null;
    }

    return () => {
      if (interValidRef.current !== null) {
        clearInterval(interValidRef.current);
        interValidRef.current = null;
      }
    };
  }, [state.isRunning])

  useRecordStorage(state.isRunning, state.totalTime);


  //ボタンの動作設定
  const onClickButton = useCallback((value: string) => {
    if (value === "開始") {
      dispatch({ type: "START" })
    } else if (value === "停止") {
      dispatch({ type: "STOP" })
    } else if (value === "リセット") {
      dispatch({ type: "RESET" })
    }
    else if (value === "削除") {
      dispatch({ type: "CLEAR" })
    } else {
      dispatch({ type: "APPEND", value })
    }

  }, [])

  return (
    <>
      <Header
        isOpen={isOpen}
        muted={muted}
        onClickVolume={() => setMuted((prev) => !prev)}
        onClickOpen={() => setIsOpen((prev) => !prev)}
        onClickClose={() => setIsOpen((prev) => !prev)}
      />
      <TimerTemplate
        totalTime={state.totalTime}
        mode={state.mode}
        focusDuration={state.focusDuration}
        onClickTime={(min) => dispatch({ type: 'APPEND', value: String(min) })}
        onClickControl={onClickButton}
        bgColorClass={bgColorClass}
        textColorClass={textColorClass}
      />
    </>


  );
};
