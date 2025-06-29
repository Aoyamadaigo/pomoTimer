import React from "react";

type Props = {
    children:string;
    onClick:(value:string)=>void
}

export const CalurateButton = React.memo((props:Props) => {
    
    const {children,onClick} = props;

    return (
        <button className="bg-slate-300 px-6 py-4"
        onClick={()=>onClick(children)}>
            {children}
        </button>
    )
})
