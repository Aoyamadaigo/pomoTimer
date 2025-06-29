import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { TimeReducer } from "./TimeReducer";
import { TimerButton } from "./TimerButton";
import { Header } from "../components/organisms/Heder";
import { useColor } from "../colorContext";

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

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export const Main = () => {
  const { color, colorDeep } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [state, dispatch] = useReducer(TimeReducer, initialState);
  const interValidRef = useRef<number | null>(null);

  //オーディオファイルの読み込み
  const focusAudio = useRef(new Audio("/audio/focus.mp3"));
  const breakAudio = useRef(new Audio("/audio/break.mp3"));

  //オーディオの制御
  useEffect(() => {
    if (state.isRunning) {
      if (state.mode === "focus") {
        breakAudio.current.pause();
        breakAudio.current.currentTime = 0;
        focusAudio.current.loop = true;
        if (muted === true) {
          focusAudio.current.volume = 0.0;
        } else {
          focusAudio.current.volume = 1.0;
        }
        focusAudio.current.play().catch(() => { }) //catchでエラーが返されても、無視する
      } else {
        focusAudio.current.pause();
        focusAudio.current.currentTime = 0;
        breakAudio.current.loop = true;
        if (muted === true) {
          focusAudio.current.volume = 0.0;
        } else {
          focusAudio.current.volume = 1.0;
        }
        breakAudio.current.play().catch(() => { }) //catchでエラーが返されても、無視する
      }

    } else {
      focusAudio.current.pause();
      breakAudio.current.pause();
    }

  }, [state.mode, state.isRunning, muted])

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

  //記録管理
  useEffect(() => {
    if (!state.isRunning && state.totalTime > 0) {
      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

      //ローカルストレージの "records" というキーに保存された過去データを読み込み。なければ空オブジェクト {} を使う
      const prev = JSON.parse(localStorage.getItem("records") || "{}");

      const prevTime = prev[today]?.totalTimeSec || 0;
      const updated = {
        ...prev,
        [today]: {
          date: today,
          totalTimeSec: prevTime + state.totalTime,
        }
      };
      localStorage.setItem("records", JSON.stringify(updated));
    }
  }, [state.isRunning]);

  //volumeButtonの制御
  const onClickOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onClickClose = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const onClickVolume = useCallback(() => {
    setMuted((prev) => !prev)
  }, [])

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

  const inputClass = useMemo(
    () => (state.mode === "focus" ? "text-slate-700" : "text-red-700"),
    [state.mode]
  );

  const totalBars = 60;
  const bgClass = `bg-${color}-${colorDeep}`;

  return (
    <>
      <Header
        isOpen={isOpen}
        muted={muted}
        onClickVolume={() => setMuted((prev) => !prev)}
        onClickOpen={() => setIsOpen((prev) => !prev)}
        onClickClose={() => setIsOpen((prev) => !prev)}
      />

      <div
        className={`flex-1 flex flex-col justify-center items-center ${bgClass} p-4 sm:p-6 md:p-8 lg:p-12`}
        style={{ height: 'calc(100vh - 60px)' }}
      >

        {/* 時間設定ボタン */}
        <div className="w-full max-w-md flex  justify-center gap-4 sm:gap-4 md:gap-6">
          {[30, 60, 90, 120].map((min) => (
            <TimerButton key={min} onClick={() => dispatch({ type: 'APPEND', value: String(min) })}>
              {min}分
            </TimerButton>
          ))}
        </div>

        {/* タイマー表示 */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 'min(80vw, 320px)', height: 'min(80vw, 320px)' }}
        >
          {[...Array(totalBars)].map((_, i) => {
            const angle = (360 / totalBars) * i;
            const filled = i < (state.totalTime / (25 * 60)) * totalBars;
            return (
              <div
                key={i}
                className={`absolute w-0.5 h-4 rounded-full origin-bottom ${filled ? 'bg-slate-600' : 'bg-white'
                  }`}
                style={{ transform: `rotate(${angle}deg) translateY(-120px)` }}
              />
            );
          })}
          <input
            value={formatTime(state.totalTime)}
            readOnly
            className={`${inputClass} pt-2 text-3xl sm:text-4xl md:text-5xl font-mono bg-inherit text-center select-none tracking-widest w-full`}
          />
        </div>

        {/* 操作ボタン */}
        <div className="w-full mt-4 max-w-md flex  justify-center gap-4 sm:gap-6 md:gap-8">
          {['開始', '停止', 'リセット', '削除'].map((label) => (
            <TimerButton
              key={label}
              onClick={() =>
                dispatch({
                  type:
                    label === '開始'
                      ? 'START'
                      : label === '停止'
                        ? 'STOP'
                        : label === 'リセット'
                          ? 'RESET'
                          : 'CLEAR',
                })
              }
            >
              {label}
            </TimerButton>
          ))}
        </div>
      </div>
    </>
  );
};
