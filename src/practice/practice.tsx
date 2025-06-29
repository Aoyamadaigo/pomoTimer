import { evaluate } from "mathjs";

type  State={
    formula:string,
    result:string,
    error:string,
}

type Action=
        {type:"CLEAR"}
    |   {type:"EVALUATE";}
    |   {type:"APPEND"; value:string;}


export const reducer = (state:State,action:Action):State =>{
    switch(action.type){
    case "APPEND":  
        return{...state,formula:state.formula+action.value,error:""}
    case "CLEAR":
        return{...state,formula:"",result:"", error:""}
    case "EVALUATE":
        const raw = state.formula.replace(/√/g, "sqrt")
        const result = evaluate(raw);
        try{
            return{...state,result:String(result),error:""}
        }catch(e){
            return{...state,error:"計算式が不正です"}
        }default{
            return state
        }
    }
    } 