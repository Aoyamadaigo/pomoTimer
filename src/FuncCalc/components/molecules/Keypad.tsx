type Props = {
  buttons: string[];
  onClick: (value: string) => void;
};

export const Keypad = ({ buttons, onClick }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className="bg-slate-500 hover:bg-slate-600 hover:scale-105 transition duration-150 text-white rounded-md text-base sm:text-xl py-2 w-16 h-12"
          onClick={() => onClick(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};
