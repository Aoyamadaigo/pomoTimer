import { Bed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Message = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const onClickStep = () => setStep((prev) => prev + 1);

    return (
        <div className="h-screen w-screen bg-emerald-50 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-hidden">

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md overflow-y-auto space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
                <Bed className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 mb-2" />

                <div className="w-full space-y-2 flex flex-col items-center">
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">もう少し頑張りたいけど、頑張れない...</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">今日はなんだか集中できない...</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">そんなあなたに、やさしく寄り添います。</p>
                    <p className="pt-2 text-base sm:text-lg md:text-xl text-gray-700">でも、大丈夫。誰にだってそういう日はある。</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">だって、私たちは人間だから。</p>
                    <p className="pt-2 text-base sm:text-lg md:text-xl text-gray-700">もし、もう少し頑張りたいと思ったなら、</p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">まずは、ちょっとだけ体を動かしてみませんか？</p>
                    <p className="font-semibold text-base sm:text-lg md:text-xl">1分だけ時間をくれる人は、ボタンをタップ。</p>
                </div>
            </div>

            <button
                onClick={onClickStep}
                className="w-full max-w-xs text-base sm:text-lg bg-emerald-300 text-white rounded-full px-6 py-3 shadow-md hover:bg-emerald-400 transition"
            >
                🌱 1分だけ体を動かしてみる
            </button>

            {step === 1 && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <div
                        className="
              fixed inset-0 
              bg-teal-100 bg-opacity-90 
              z-50 
              flex flex-col items-center justify-center 
              p-6 sm:p-8 
              space-y-4 sm:space-y-6
            "
                    >
                        <p className="text-lg sm:text-xl font-semibold">🧘‍♀️ 深呼吸しましょう</p>
                        <p className="text-sm sm:text-base text-gray-600">
                            10秒かけて、ゆっくり息を吸って、吐いてみてください。
                        </p>
                        <button
                            onClick={() => setStep(2)}
                            className="
                mt-6 
                bg-emerald-400 
                px-4 py-2 sm:px-6 sm:py-3 
                rounded-full text-white 
                hover:bg-emerald-500 transition
              "
                        >
                            次へ
                        </button>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <div
                        className="
              fixed inset-0 
              bg-teal-100 bg-opacity-90 
              z-50 
              flex flex-col items-center justify-center 
              p-6 sm:p-8 
              space-y-4 sm:space-y-6
            "
                    >
                        <p className="text-lg sm:text-xl font-semibold">
                            🤸‍♀️ 肩をぐるぐる回してみましょう
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            ゆっくり大きく5回、深呼吸しながら行ってみてください。
                        </p>
                        <button
                            onClick={() => setStep(3)}
                            className="
                mt-6 
                bg-emerald-400 
                px-4 py-2 sm:px-6 sm:py-3 
                rounded-full text-white 
                hover:bg-emerald-500 transition
              "
                        >
                            次へ
                        </button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <div
                        className="
              fixed inset-0 
              bg-teal-100 bg-opacity-90 
              z-50 
              flex flex-col items-center justify-center 
              p-6 sm:p-8 
              space-y-4 sm:space-y-6
            "
                    >
                        <p className="text-lg sm:text-xl font-semibold">
                            🧠 集中の準備ができました
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            今の呼吸と感覚を大切にしたまま、短く集中してみましょう。
                        </p>
                        <button
                            onClick={() => {
                                navigate("/");
                                setStep(0);
                            }}
                            className="
                mt-6 
                bg-indigo-500 
                px-4 py-2 sm:px-6 sm:py-3 
                rounded-full text-white 
                hover:bg-indigo-600 transition
              "
                        >
                            🌟 集中をはじめる
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
