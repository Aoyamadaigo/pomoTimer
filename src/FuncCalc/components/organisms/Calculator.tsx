// components/organisms/Calculator.tsx

import { useCallback, useEffect, useReducer, useState } from "react";
import { FuncReducer } from "../../FuncReducer";
import type { CalcType } from "../../../type/CalcType"; 
import { Trash2 } from "lucide-react";
import { FormulaInput } from "../molecules/FormulaInput";
import { Keypad } from "../molecules/keypad";
import { HistoryItem } from "../molecules/HistoryItems";
import { EditForm } from "../molecules/EditForm";

const initialState = {
  formula: "",
  result: "",
  error: null,
};

const buttons = [
  "sin(", "cos(", "tan(", "log(", "√(", "(", ")", "^",
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "←", "C"
];

export const Calculator = () => {
  const [state, dispatch] = useReducer(FuncReducer, initialState);
  const [history, setHistory] = useState<CalcType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onClickBtn = (value: string) => {
    if (value === "C") {
      dispatch({ type: "CLEAR" });
    } else if (value === "=") {
      dispatch({ type: "EVALUATE" });
    } else if (value === "←") {
      dispatch({ type: "BACKSPACE" });
    } else {
      dispatch({ type: "APPEND", value });
    }
  };

  useEffect(() => {
    if (state.error === null && state.result !== "") {
      const newRecord = { formula: state.formula, result: state.result };
      const prev = JSON.parse(localStorage.getItem("records") || "[]") as CalcType[];
      const updated = [newRecord, ...prev];
      localStorage.setItem("records", JSON.stringify(updated));
      setHistory(updated);
    }
  }, [state.result]);

  useEffect(() => {
    const stored = localStorage.getItem("records");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const validKeys = "0123456789+-*/().^";
      if (validKeys.includes(key)) dispatch({ type: "APPEND", value: key });
      else if (key === "Enter" || key === "=") dispatch({ type: "EVALUATE" });
      else if (key === "Backspace") dispatch({ type: "BACKSPACE" });
      else if (key.toLowerCase() === "c") dispatch({ type: "CLEAR" });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onClickOpen = useCallback((index: number) => {
    setIndex(index);
    setIsOpen(true);
  }, []);

  const onClickClose = useCallback(() => setIsOpen(false), []);

  const onClickAppendFromHistory = useCallback((index: number) => {
    dispatch({ type: "APPEND", value: history[index].formula });
  }, [history]);

  const onClickDelete = useCallback((index: number) => {
    setHistory(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  const onChangeFormula = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormula = e.target.value;
    setHistory(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], formula: newFormula };
      return updated;
    });
  }, [index]);

  const onChangeResult = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newResult = e.target.value;
    setHistory(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], result: newResult };
      return updated;
    });
  }, [index]);

  return (
    <>
      <div className="min-h-screen bg-slate-800 text-white flex flex-col md:flex-row items-center justify-center p-4 gap-6">
        <div className="flex flex-col items-center w-full md:w-auto">
          <FormulaInput value={state.formula} error={state.error} onClear={() => dispatch({ type: "CLEAR" })} />
          <p className="text-sm text-gray-300 mb-2">
            ※キーボードでも数式入力が可能です<br />Ex）Enter：計算結果を履歴に表示
          </p>
          <Keypad buttons={buttons} onClick={onClickBtn} />
        </div>

        <div className="bg-slate-100 text-slate-800 rounded-lg shadow p-4 w-full max-w-md md:h-[20rem] overflow-y-auto relative">
          <h2 className="text-lg font-bold text-slate-700 mb-2">履歴（数式クリックで空の入力欄に表示可能）</h2>
          <ul className="space-y-2">
            {history.map((item, i) => (
              <HistoryItem
                key={i}
                formula={item.formula}
                result={item.result}
                onClick={() => onClickAppendFromHistory(i)}
                onEdit={() => onClickOpen(i)}
                onDelete={() => onClickDelete(i)}
              />
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

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <EditForm
            formula={history[index].formula}
            result={history[index].result}
            onChangeFormula={onChangeFormula}
            onChangeResult={onChangeResult}
            onClose={onClickClose}
          />
        </div>
      )}
    </>
  );
};
