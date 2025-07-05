type Props = {
  totalBars: number;
  progressRatio: number; // 0~1
  radius?: number; // default 120
};

export const ProgressRings = ({ totalBars, progressRatio, radius = 120 }: Props) => {
  return (
    <>
      {[...Array(totalBars)].map((_, i) => {
        const angle = (360 / totalBars) * i;
        const filled = i < totalBars * progressRatio;
        return (
          <div
            key={i}
            className={`absolute w-0.5 h-4 rounded-full origin-bottom ${filled ? 'bg-slate-600' : 'bg-white'}`}
            style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
          />
        );
      })}
    </>
  );
};
