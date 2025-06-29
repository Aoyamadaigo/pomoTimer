import { useEffect, useReducer, useRef } from "react"
import { TimeReducer } from "./TimeReducer";

const initialState = {
    time: "",
    initialTime: "",
    isRunning: false
}

    const [state, dispatch] = useReducer(TimeReducer, initialState)

//タイマーの動作設定(副作用)
export const timeRef = useEffect(() => {
    const interValidRef = useRef<number | null>(null);

    if (state.isRunning === false && !interValidRef.current) {
        interValidRef.current = setInterval(() => {
            dispatch({ type: "TICK" })
        }, 1000)
    }

    if (!state.isRunning && interValidRef.current) {
        clearInterval(interValidRef.current);
        interValidRef.current = null;
    }
},[state.isRunning])