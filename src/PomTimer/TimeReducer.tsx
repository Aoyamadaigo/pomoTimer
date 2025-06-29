type State = {
    initialTime: string; //初期設定時間
    time: string; //セッションの残り時間
    totalTime: number; //全体カウント
    isRunning: boolean;//タイマーの動作制御
    mode: "focus" | "break";
    focusDuration: number;
    breakDuration: number;
}

type Action =
    { type: "START" }
    | { type: "STOP" }
    | { type: "RESET" }
    | { type: "CLEAR" }
    | { type: "APPEND"; value: string }
    | { type: "TICK" }

//reducer内部では状態とアクションのみを管理
export const TimeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "START":
            return { ...state, isRunning: true }
        case "STOP":
            return { ...state, isRunning: false }
        case "RESET":
            return { ...state, time: String(state.focusDuration), totalTime: Number(state.initialTime), isRunning: false, mode: "focus" }
        case "CLEAR":
            return { ...state, time: "", totalTime: 0, isRunning: false }
        case "APPEND":
            const newTime = String(Number(action.value) * 60);
            return { ...state, time: newTime, initialTime: newTime, totalTime: Number(newTime), isRunning: false }
        case "TICK":
            const tickTime = Number(state.time) - 1;
            const newTotalTime = state.totalTime - 1;

            // 全体時間終了 → 停止
            if (newTotalTime <= 0) {
                return {
                    ...state,
                    isRunning: false,
                    time: "0",
                    totalTime: 0,
                };
            }

            // セッション中 → カウントダウン継続
            if (tickTime > 0) {
                return {
                    ...state,
                    time: String(tickTime),
                    totalTime: newTotalTime
                };
            }

            const nextMode = state.mode === "break" ? "focus" : "break";
            const nextDuration = state.mode === "break" ? state.focusDuration : state.breakDuration;

            return {
                ...state,
                mode: nextMode,
                time: String(nextDuration),
                totalTime: newTotalTime
            }

        default:
            return state
    }
}

