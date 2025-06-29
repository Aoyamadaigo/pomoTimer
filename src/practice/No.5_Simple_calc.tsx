import { useCallback, useState } from "react"
import { CalurateButton } from "./components/Atom/button/CalcurateButton";
import { evaluate } from "mathjs";

export default function App() {

  const [numStr, setNumStr] = useState<string>("")

  const onClickInput = useCallback((value: string) => {
    if (value === "C") {
      setNumStr("");
    } else if (value === "=") {
      const value = evaluate(numStr);
      setNumStr(String(value));
    } else if (value === "()") {
      const openCount = (numStr.match(/\(/g) || []).length;
      const closeCount = (numStr.match(/\)/g) || []).length;

      if (openCount > closeCount) {
        setNumStr((prev) => prev + ")");
      } else {
        setNumStr((prev) => prev + "(");
      }
  } else {
    setNumStr((prev) => (
      prev + value
    ))
}
  }, [numStr])



const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setNumStr(value)
}, [])

const buttons = ["C", "()", "%", "÷", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", "00", ".", "="]

return (
  <div className="bg-black min-h-screen flex flex-col items-center justify-center">
    <input placeholder="ボタンで計算式を入力してください"
      className="px-10 py-5 w-[300px] text-right "
      onChange={onChangeInput} value={numStr}
      disabled={true}
    />
    <div className=" grid gap-3 grid-cols-4 pt-5">
      {(buttons.map((button, index) => (
        <CalurateButton key={index} children={String(button)} onClick={onClickInput} />
      )
      ))}
    </div>
  </div>
)
}