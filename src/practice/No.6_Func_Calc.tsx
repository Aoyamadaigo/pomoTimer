import { useReducer } from "react";
import { reducer } from "./No.6_reducer";


const initialState = {
  formula: "",
  result: "",
  error: null,
}


const buttons = [
  "sin(", "cos(", "tan(", "log(", "√(", "(", ")", "^",
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "C"
];

export const Main = ()=> {
  const [state,dispatch] = useReducer(reducer,initialState);

  const onClickBtn=(value:string)=>{
    if(value === "C"){
      dispatch({type:"CLEAR"});
    }else if(value === "="){
      dispatch({type:"EVALUATE"});
    }else{
      dispatch({type:"APPEND",value});
    }
    }

  return(
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <input className="w-80 p-4 text-right text-2xl bg-white text-black mb-2" placeholder="関数式を入力してください"
      value = {state.formula} readOnly />
    <div className="">{state.result}</div>
    {state.error && <div>{state.error}</div>}
    <div className="grid grid-cols-4 gap-2">
    {buttons.map((btn,index)=>(
      <button 
      key={index}
      className= "bg-slate-500 py-3 rounded text-white text-xl w-[60px]"
      onClick={()=>onClickBtn(btn)}>
        {btn}
      </button>
    ))}
    </div>
    </div>
  )
}

