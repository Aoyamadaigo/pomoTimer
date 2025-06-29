import { useReducer } from "react"
import { TimeReducer } from "./PomTimer/BK/TimeReducer"
import { TimerButton } from "./PomTimer/TimerButton"

// 初期値設定
const initialState = {
    time: "",
    initialTime: "",
}

export default function App() {

    const [state,dispatch]  = useReducer(TimeReducer,initialState);

    const onClickButton = (value:string) => {
        if(value === "開始"){
            dispatch({type:"START"})
        }else if(value === "停止"){
            dispatch({type:"STOP"})
        }else if(value === "リセット"){
            dispatch({type:"RESET"})
        }
        else if(value === "削除"){
            dispatch({type:"CLEAR"})
        }else{
            dispatch({type:"APPEND",value})
        }

    }
    


    return (
        <div className="min-h-screen flex flex-col justify-center items-center
            bg-blue-200 space-y-5">

            {/* 時間設定ボタン */}
            <div className=" flex gap-10">
                <TimerButton children={"30"} onClick={()=>onClickButton("30")} />
                <TimerButton children={"60"} onClick={()=>onClickButton("60")} />
                <TimerButton children={"90"} onClick={()=>onClickButton("90")} />
            </div>

            {/* Timer */}
            <input className="bg-white w-[300px] h-[300px]  rounded-full 
            text-center text-3xl"
                value={state.time} readOnly
            />
            
            {/* 開始・停止・リセット削除ボタン */}
            <div className=" flex gap-10">
                <TimerButton children={"開始"} onClick={()=>onClickButton("開始")} />
                <TimerButton children={"停止"} onClick={()=>onClickButton("停止")} />
                <TimerButton children={"リセット"} onClick={()=>onClickButton("リセット")} />
                <TimerButton children={"削除"} onClick={()=>onClickButton("削除")} />

            </div>
        </div>
    )

}