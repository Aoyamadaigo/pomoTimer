// import { useRef } from "react";

import { evaluate } from "mathjs";

// type State = {
//     time: string,
//     initialTime: string
// }

// type Action =
//     { type: "START" }
//     | { type: "STOP" }
//     | { type: "RESET" }
//     | { type: "CLEAR" }
//     | { type: "APPEND"; value: string; }


// export const TimeReducer = (state: State, action: Action) => {

//     const interValidRef = useRef<number | null>(null);

//     switch (action.type) {
//         case "START":
//             interValidRef.current = setInterval(() => {
//                 const numericTime = Number(state.time);
//                 if (numericTime >= 1){
//                     state.time = String((numericTime) - 1)
//                 } else {
//                     clearInterval(interValidRef.current!);
//                     interValidRef.current = null;
//                 }
//             }, 1000)
//             return state;
//         case "STOP":
//             clearInterval(interValidRef.current!)
//             return state;
//         case "RESET":
//             return { ...state, time: state.initialTime }

//         case "CLEAR":
//             return { ...state, time: "", initialTime: "" }

//         case "APPEND":
//             return {
//                 ...state, time: state.time + action.value
//                 , initialTime: state.time + action.value
//             }
//     }

// }

type State = {
    time: string,
    initialTime: string
}

type Action =
    { type: "START" }
    | { type: "STOP" }
    | { type: "RESET" }
    | { type: "CLEAR" }
    | { type: "APPEND"; value: string; }


export const TimeReducer = (state: State, action: Action) => {

    switch (action.type) {
        case "START":
            const interValid = setInterval(() => {
                const numericTime = Number(state.time);
                console.log(numericTime)
                if (numericTime >= 1){
                    state.time = String((numericTime) - 1)
                } else {
                    clearInterval(interValid);
                }
            }, 1000)
            return state;
        case "STOP":
            clearInterval(interValid!)
            return state;
        case "RESET":
            return { ...state, time: state.initialTime }

        case "CLEAR":
            return { ...state, time: "", initialTime: "" }

        case "APPEND":
            return {
                ...state, time: evaluate(state.time + "+" +  action.value),
                initialTime: evaluate(state.time + "+" + "+" +action.value)
            }
    }

}