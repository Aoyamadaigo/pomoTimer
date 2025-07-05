type Props = {
  formula: string;
  result: string;
  onChangeFormula: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeResult: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
};

export const EditForm = ({
  formula,
  result,
  onChangeFormula,
  onChangeResult,
  onClose,
}: Props) => {
  return (
    <div className="bg-slate-400 w-[90%] max-w-sm p-4 rounded-lg space-y-3">
      <label htmlFor="formula" className="block font-mono">
        関数式
      </label>
      <input
        id="formula"
        onChange={onChangeFormula}
        value={formula}
        className="w-full px-2 py-2 text-left text-base bg-white text-black rounded-lg"
      />

      <label htmlFor="result" className="block font-mono mt-2">
        計算結果
      </label>
      <input
        id="result"
        onChange={onChangeResult}
        value={result}
        className="w-full px-2 py-2 text-left text-base bg-white text-black rounded-lg"
      />

      <button
        className="w-full text-sm py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        onClick={onClose}
      >
        閉じる
      </button>
    </div>
  );
};
