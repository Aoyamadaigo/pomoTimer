import { useCallback, useEffect, useReducer, useState } from "react";
import { FuncReducer } from "./FuncReducer";
import type { CalcType } from "../type/CalcType";
import { Trash2 } from "lucide-react";


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
  "←", "C"
];

export const FuncCalc = () => {
  const [state, dispatch] = useReducer(FuncReducer, initialState);

  const onClickBtn = (value: string) => {
    if (value === "C") {
      dispatch({ type: "CLEAR" });
    } else if (value === "=") {
      dispatch({ type: "EVALUATE" });
    } else if (value === "←") {
      dispatch({ type: "BACKSPACE" })
    } else {
      dispatch({ type: "APPEND", value });
    }
  }

  const [history, setHistory] = useState<CalcType[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (state.error === null && state.result !== "") {

      const newRecord: CalcType = {
        formula: state.formula,
        result: state.result
      };


      const prev = JSON.parse(localStorage.getItem("records") || "[]") as CalcType[];

      const updated = [newRecord, ...prev];
      localStorage.setItem("records", JSON.stringify(updated))

      setHistory(updated);
    }
  }, [state.result])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // 数値や記号（通常入力）
      const validKeys = "0123456789+-*/().^";

      if (validKeys.includes(key)) {
        dispatch({ type: "APPEND", value: key });
      } else if (key === "Enter" || key === "=") {
        dispatch({ type: "EVALUATE" });
      } else if (key === "Backspace") {
        dispatch({ type: "BACKSPACE" });
      } else if (key.toLowerCase() === "c") {
        dispatch({ type: "CLEAR" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("records");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(history));
  }, [history]);


  const onClickOpen = (i: number) => {
    setIndex(i);
    setIsOpen(true);
  }

  const onClickClose = () => {
    setIsOpen(false);
  }

  const onClickAppendFromHistory = useCallback((index: number) => {
    dispatch({ type: "APPEND", value: history[index].formula });
  }, [history]);


  const onChangeFormula = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormula = e.target.value

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[index] = { ...newHistory[index], formula: newFormula };
      return newHistory
    })
  }, [index])

  const onChangeResult = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newResult = e.target.value

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[index] = { ...newHistory[index], result: newResult };
      return newHistory
    })
  }, [index])



  const onClickDelete = useCallback((index: number) => {
    setHistory((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);



  return (
    <>
      <div className="min-h-screen bg-slate-800 text-white flex flex-col md:flex-row items-center justify-center p-4 gap-6">
        {/* 電卓エリア */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <input
            className="w-full max-w-xs p-3 text-right text-xl bg-white text-black rounded mb-2"
            placeholder="関数式を入力（キーボード対応）"
            value={state.formula}
            readOnly
          />
          <p className="text-sm text-gray-300 mb-2">
            ※キーボードでも数式入力が可能です<br></br>
            Ex）Enter：計算結果を履歴に表示
          </p>
          {state.error && (
            <div className="text-red-400 text-sm">{state.error}</div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className="bg-slate-500 hover:bg-slate-600 hover:scale-105 transition duration-150 text-white rounded-md text-base sm:text-xl py-2 w-16 h-12"
                onClick={() => onClickBtn(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* 履歴エリア */}
        <div className="bg-slate-100 text-slate-800 rounded-lg shadow p-4 w-full max-w-md md:h-[20rem] overflow-y-auto relative">
          <h2 className="text-lg font-bold text-slate-700 mb-2">履歴（数式クリックで空の入力欄に表示可能）</h2>
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li key={index} className="text-m text-slate-700"
                onClick={() => onClickAppendFromHistory(index)}
              >
                {item.formula} = {item.result}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={(e) =>{ 
                      e.stopPropagation(); 
                      onClickOpen(index)
                    }}
                    className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => onClickDelete(index)}
                    className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="absolute bottom-2 right-2 text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105"
            onClick={() => {
              localStorage.removeItem("records");
              setHistory([]);
            }}
          >
            <Trash2 className="inline text-sm mr-1 mb-1" />
            履歴を全削除
          </button>
        </div>
      </div>

      {/* モーダル */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-400 w-[90%] max-w-sm p-4 rounded-lg space-y-3">
            <label htmlFor="formula" className="block font-mono">
              関数式
            </label>
            <input
              id="formula"
              onChange={onChangeFormula}
              value={history[index].formula}
              className="w-full px-2 py-2 text-left text-base bg-white text-black rounded-lg"
            />
            <label htmlFor="result" className="block font-mono mt-2">
              計算結果
            </label>
            <input
              id="result"
              onChange={onChangeResult}
              value={history[index].result}
              className="w-full px-2 py-2 text-left text-base bg-white text-black rounded-lg"
            />
            <button
              className="w-full text-sm py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={onClickClose}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
