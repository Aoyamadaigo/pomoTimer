import { memo, type ReactNode } from "react"

type Props={
        children:ReactNode;
        onClick:()=>void;
    }

/*
*親コンポーネントの再レンダリングに伴い、PrimaryButtonも再生成される
*そのため、memo化で再生成を防ぐとパフォーマンスが向上する
*/
export const PrimaryButton =memo((props:Props)=>{

    const {children,onClick} = props; 

    return(
        <button 
        className =" px-8 py-4 text-lg bg-white text-black  border  rounded-lg 
        hover:bg-blue-500 cursor-pointer duration-300 "
        onClick={onClick} >{children}</button>

    )
})