// import { useCallback, useEffect, useRef, useState } from "react";
// import { TimerButton } from "./components/Atom/TimerButton";

// export default function App() {

//   const [time, setTime] = useState<number>(0);
//   const [initialTime, setInitialTime] = useState<number>(0);

//   const [progress, setProgress] = useState<number>(0);

  //予約されたIDを格納しておく「箱」
//   const interValidRef = useRef<number | null>(null)

  //時間ごとの処理を定義

  // const onClickStart = useCallback(() => {
    // if (interValidRef.current !== null) return;
    /*
    *setInterval は「繰り返し実行されるタスク（ループ）」を
    * JavaScriptの実行キューに登録する“ID付きの予約”を作り出している。
    * 返り値：予約されたタスクのID
    */
//     interValidRef.current = setInterval(() => {
//       setTime((prev) => {
//         if (prev > 0) {
//           return prev - 1
//         } else {
//           clearInterval(interValidRef.current!) // 「！」でnullじゃないと明示して予約キャンセル
//           interValidRef.current = null  // IDを空にして「何も予約されていない」状態に戻す
//           return 0
//         }
        // console.log(time); 最初のtimeが常に保持されてしまう
//       })
//     }, 1000)
//   }, [initialTime])//無限ループを起こすので、timeを入れない

//   useEffect(() => {
//     if (initialTime > 0) {
//       setProgress((time/ initialTime) * 100);
//     } else {
//       setProgress(0);
//     }
//   }, [time, initialTime]);

//   const onClickStop = useCallback(() => {
//     clearInterval(interValidRef.current!);
//     interValidRef.current = null
//   }, [])

//   const onChangeTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTime(Number(e.target.value))
//     setInitialTime(Number(e.target.value));
//   }

//   const onClickReset = useCallback(() => {
//     setTime(initialTime);
//   }, [initialTime])



//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
//       <div className="flex justify-center items-center h-[500px]
//          bg-blue-400 rounded-full"
//         style={{ width: `${progress}%` }}>
//         <input className=" text-7xl font-bold bg-transparent 
//             text-center focus:outline-none focus:ring-0" type="number" onChange={onChangeTimer} value={time} />
//       </div>
//       <div className="flex space-x-10 pt-8">
//         <TimerButton children={"スタート"} onClick={onClickStart} />
//         <TimerButton children={"一時停止"} onClick={onClickStop} />
//         <TimerButton children={"リセット"} onClick={onClickReset} />
//       </div>
//       {initialTime < 0 &&(
//         <p className="pt-5 text-3xl text-red-500">0以上の時間を入力してください！</p>
//       )}
//     </div>


//   )
// }

import { useCallback, useEffect, useRef, useState } from "react"
import { TimerButton } from "./components/Atom/TimerButton";

export default function App() {

  const [time, setTime] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [timeStr, setTimeStr] = useState<string>("")
  const [progress, setProgress] = useState<number>(0)

  const interValidRef = useRef<number | null>(null);

  const onClickStart = useCallback(() => {
    const numericTime = Number(timeStr);
    if (isNaN(numericTime) || numericTime <= 0) return;
    if (interValidRef.current != null) return;

    setTime(numericTime);         // ← time をセット
    setInitialTime(numericTime); // ← 初期値もセット

    let current = numericTime;

    interValidRef.current =setInterval(() => {
      current -= 1;
      if (current >= 0) {
        setTime(current);
      } else {
        clearInterval(interValidRef.current!);
        interValidRef.current = null;
      }
    }, 1000);
  }, [timeStr]);


  useEffect(() => {
    if (interValidRef.current !== null) {
      setTimeStr(String(time)); // タイマー実行中だけ timeStr を上書き
    }
  }, [time]);

  useEffect(() => {
    if (initialTime > 0) {
      setProgress((time / initialTime) * 100)
    } else {
      setProgress(0);
    }
  }, [time, initialTime])


  const onClickStop = useCallback(() => {
    clearInterval(interValidRef.current!)
    interValidRef.current = null
  }, [])

  const onClickReset = useCallback(() => {
    setTimeStr(String(initialTime))
  }, [])

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeStr(value);

  }

  return (

    <div className="flex flex-col items-center justify-center  min-h-screen  bg-slate-300">
      <div className=" h-[400px] bg-blue-500 
          flex items-center justify-center text-3xl "
        style={{ width: `${progress}%` }} >
        <input type="number"
          className="text-center  text-8xl bg-blue-100 focus:outline-none"
          onChange={onChangeTime} value={timeStr} disabled={interValidRef.current !== null}/>

      </div>
      <div className="text-center space-x-10 ">
        <TimerButton children={"スタート"} onClick={onClickStart} />
        <TimerButton children={"一時停止"} onClick={onClickStop} />
        <TimerButton children={"リセット"} onClick={onClickReset} />
      </div>
    </div>
  )
}