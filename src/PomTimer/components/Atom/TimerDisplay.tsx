type Props = {
  value: string;
  className?: string;
};

export const TimerDisplay = ({ value, className = "" }: Props) => (
  <input
    value={value}
    readOnly
    className={`${className} pt-2 text-3xl sm:text-4xl md:text-5xl font-mono bg-inherit text-center select-none tracking-widest w-full`}
  />
);
