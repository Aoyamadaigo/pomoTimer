import { useCallback, useState } from "react"
import { ColorButton } from "./components/Atom/button/colorButton";
import { useColor } from "./colorContext";
import { useNavigate } from "react-router-dom";

export const Color = () => {

    const {color,colorDeep,setColor,setColorDeep} =useColor();

    const navigate = useNavigate();


    const onClickColor = useCallback((color: string) => {
        setColor(color);
    }, [])

    const onClickColorDeep = useCallback((colorDeep: string) => {
        setColorDeep(colorDeep);
    }, [])

    const onClickBack =()=>{
        navigate("/")
    }

    const colors = ["red", "blue", "green", "yellow", "purple", "pink", "teal", "indigo", "gray", "orange"];
    const colorDeepPairs = [
        { deep: "200", text: "薄め" },
        { deep: "400", text: "標準" },
        { deep: "600", text: "濃いめ" }
    ]

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-${color}-${colorDeep}`}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
                {colorDeepPairs.map(({ deep, text }) => (
                    <button
                        key={deep}
                        className={`text-3xl  px-4 py-2 rounded-xl bg-slate-200 
                                    ${colorDeep === deep ? 'ring-4' : 'bg-slate-200  border-2'}`}
                        onClick={() => onClickColorDeep(deep)}>{text}</button>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
                {colors.map((c) => (
                    <ColorButton key={c} selectedColor={color} color={c} colorDeep={colorDeep} onClickColor={onClickColor} />
                ))}
            </div>
            <button className="text-xl  mt-10 border-2 border-gray-400 px-4 py-4 rounded-xl bg-slate-200"
            onClick = {onClickBack}
            >
                ホーム画面に戻る
            </button>
        </div>
    )
}