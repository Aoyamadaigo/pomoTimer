import { useEffect, useState } from "react";

export const TimerUi = () => {
  const totalBars = 60;
  const [progress, setProgress] = useState(0); // 0〜totalBars

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < totalBars ? prev + 1 : 0));
    }, 1000); // 1秒ごとに進行

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {[...Array(totalBars)].map((_, i) => {
        const angle = (360 / totalBars) * i;
        const filled = i < progress;

        return (
          <div
            key={i}
            className={`absolute w-1 h-6 rounded-full origin-bottom ${
              filled ? "bg-blue-500" : "bg-gray-300"
            }`}
            style={{
              transform: `rotate(${angle}deg) translateY(-100px)`,
            }}
          />
        );
      })}
      <div className="absolute text-2xl font-bold">{totalBars - progress}s</div>
    </div>
  );
};
