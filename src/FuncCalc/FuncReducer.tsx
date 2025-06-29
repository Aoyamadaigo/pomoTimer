import { evaluate } from "mathjs";

type State = {
    formula: string;
    result: string;
    error: string | null;
}

// |はorを表す
type Action =
    | { type: "APPEND"; value: string }
    | { type: "CLEAR" }
    | { type: "EVALUATE" }
    | { type: "ERROR", message: string }
    | { type: "BACKSPACE" }


export const FuncReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "APPEND":
            return { ...state, formula: state.formula + action.value, error: null };
        case "CLEAR":
            return { ...state, formula: "", result: "", error: null }
        case "EVALUATE":
            try {
                const raw = state.formula.replace(/√/g, "sqrt");
                const result = evaluate(raw);
                return { ...state, result:String(result),error: null }

            } catch (e) {
                return { ...state, error: "計算式が不正です" };
            }
        case "BACKSPACE":
            {
                return{...state,formula:state.formula.slice(0,-1),error:null }
            }
        case "ERROR":
            return { ...state, error: action.message };
        default:
            return state;
    }

}