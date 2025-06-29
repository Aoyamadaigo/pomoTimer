import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoodSelector } from "../ModeSelector";

export const Top = () => {

    const [feeling, setFeeling] = useState<number>(0);
    const [step, setStep] = useState<number>(0);

    // const navigate = useNavigate();

    const onClickNext = () => {
        setStep((prev) => prev + 1);
    }

    return (
        <>
            {step === 0 &&
                <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center font-mono space-y-5">
                    <h1 className=" text-3xl text-slate-400">🌻ひとこと日記</h1>
                    <h2 className="text-xl text-center">
                        来てくれてありがとう。
                        <br></br>
                        私と一緒に気持ちを整理していきませんか？
                    </h2>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="border-2 rounded-full font-mono text-slate-100 p-4 bg-emerald-200 "
                        onClick={onClickNext}
                    >
                        今日の気持ちを整理する
                    </motion.button>
                </div>
            }

            {step === 1 &&
                <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center font-mono space-y-5">
                    <MoodSelector/>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="border-2 rounded-full font-mono text-slate-100 p-4 bg-emerald-300 "
                        onClick={onClickNext}
                    >
                        今日の気持ちを選択する
                    </motion.button>
                </div>
                
            }
            {step === 2 &&
                <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center font-mono space-y-5">
                    <p>今、○○な気持ちなんですね</p>
                    <p>もし、よければ、その気持ちを私に教えてくれませんか？</p>
                </div>
            }
        </>

    )
}