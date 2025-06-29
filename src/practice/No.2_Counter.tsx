
import { useCallback, useState } from "react"

export default function No2(){

  const[counter,setCounter] = useState<number>(0)
  
  const onClickAdd=useCallback(()=>{
    setCounter((prev) =>(prev+1))
  },[])

  const onClickMinus=useCallback(()=>{
    setCounter((prev) =>(prev-1))
  },[])

  return(
    //Reactではbodyタグは基本的に使わない
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="pt-5 text-center space-y-12  bg-white border border-white w-64 h-80">
        <h1 className="text-3xl text-gray-300">Counter</h1>
        <p className="text-7xl">{counter}</p>
        <div className="flex items-center justify-center space-x-10">
        <button className="py-6  px-8 rounded-full bg-blue-500 text-white hover:bg-blue-950 duration-300"
          onClick={onClickAdd}
          aria-label="Increase counter" //スクリーンリーダーの対応。SEO効果アップ！
        
        >+</button>
        <button className="py-6 px-8 rounded-full bg-blue-500 text-white hover:bg-blue-950 duration-300"
          onClick={onClickMinus}
        >-</button>
        </div>
      </div>
    </div>
  )}

 

//カスタムフック化
export const useCounter = ()=>{

   const onClickAdd=useCallback(()=>{
    setCounter((prev) =>(prev+1))
  },[])

  const onClickMinus=useCallback(()=>{
    setCounter((prev) =>(prev-1))
  },[])

  const [counter,setCounter] = useState<number>(0)

  const counterApp = ()=>{
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="pt-5 text-center space-y-12  bg-white border border-white w-64 h-80">
        <h1 className="text-3xl text-gray-300">Counter</h1>
        <p className="text-7xl">{counter}</p>
        <div className="flex items-center justify-center space-x-10">
        <button className="py-6  px-8 rounded-full bg-blue-500 text-white hover:bg-blue-950 duration-300"
          onClick={onClickAdd}
          aria-label="Increase counter" //スクリーンリーダーの対応。SEO効果アップ！
        
        >+</button>
        <button className="py-6 px-8 rounded-full bg-blue-500 text-white hover:bg-blue-950 duration-300"
          onClick={onClickMinus}
        >-</button>
        </div>
      </div>
    </div>
  }
  return{counterApp,counter}
}