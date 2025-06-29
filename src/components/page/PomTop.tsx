import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Top = () => {

    const navigate = useNavigate();
    const onClickNext = useCallback(() => {
        navigate("/main")
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-emerald-50 text-center space-y-6 px-6">
            <h1 className="text-4xl font-bold text-emerald-600">🌻 ひと休みポモドーロ</h1>
            <p className="text-lg text-gray-700 max-w-md">
                優しく集中をサポートする、アナタのためのポモドーロアプリ<br />
                ゆるっと始めて、やさしく記録。
                <br></br>
                疲れてても、大丈夫。
            </p>
            <motion.button className="mt-6 px-6 py-3 bg-emerald-400 text-white rounded-full shadow hover:bg-emerald-500 transition"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onClickNext}>
                今すぐ使ってみる
            </motion.button>
        </div>
    )
}
