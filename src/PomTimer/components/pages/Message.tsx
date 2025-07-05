import { Bed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Message = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const onClickStep = () => setStep((prev) => prev + 1);

    return (
        <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6 sm:p-10 text-gray-700 font-light tracking-wide space-y-6">
            <Bed className="w-10 h-10 text-emerald-500 mb-2" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl text-base sm:text-lg space-y-3 text-center"
            >
                <p>もう少し頑張りたいけど、頑張れない...</p>
                <p>今日はなんだか集中できない...</p>
                <p>そんなあなたに、やさしく寄り添います。</p>

                <p className="pt-4">でも、大丈夫。誰にだってそういう日はある。</p>
                <p>だって、私たちは人間だから。</p>

                <p className="pt-4">もし、もう少し頑張りたいと思ったなら、</p>
                <p>まずは、ちょっとだけ体を動かしてみませんか？</p>

                <p className="font-semibold">1分だけ時間をくれる人は、ボタンをタップ。</p>

                <button
                    className="text-base sm:text-lg mt-10 bg-emerald-400 text-white rounded-full px-6 py-3 shadow-md hover:bg-emerald-500 transition"
                    onClick={onClickStep}
                >
                    🌱 1分だけ体を動かしてみる
                </button>
            </motion.div>

            {step === 1 && (
                <Overlay
                    title="🧘‍♀️ 深呼吸しましょう"
                    text="10秒かけて、ゆっくり息を吸って、吐いてみてください。"
                    onClick={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <Overlay
                    title="🤸‍♀️ 肩をぐるぐる回してみましょう"
                    text="ゆっくり大きく5回、深呼吸しながら行ってみてください。"
                    onClick={() => setStep(3)}
                />
            )}

            {step === 3 && (
                <Overlay
                    title="🧠 集中の準備ができました"
                    text="今の呼吸と感覚を大切にしたまま、短く集中してみましょう。"
                    buttonText="🌟 集中をはじめる"
                    onClick={() => {
                        setStep(0);
                        navigate("/");
                    }}
                />
            )}
        </div>
    );
};

const Overlay = ({
    title,
    text,
    onClick,
    buttonText = "次へ",
}: {
    title: string;
    text: string;
    onClick: () => void;
    buttonText?: string;
}) => (
    <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center px-6 py-8 sm:px-10 space-y-6 text-center">
            <p className="text-xl sm:text-2xl font-semibold">{title}</p>
            <p className="text-gray-600 text-base sm:text-lg max-w-md">{text}</p>
            <button
                onClick={onClick}
                className="mt-4 bg-emerald-400 px-6 py-3 rounded-full text-white hover:bg-emerald-500 transition text-base sm:text-lg"
            >
                {buttonText}
            </button>
        </div>
    </>
);
