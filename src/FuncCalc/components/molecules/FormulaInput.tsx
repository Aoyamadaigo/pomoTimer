import { InputField } from "../atoms/InputField"; 
import { ErrorMessage } from "../atoms/ErrorMessage";

type Props = {
  value: string;
  error?: string | null;
  onClear: () => void;
};

export const FormulaInput = ({ value, error, onClear }: Props) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <InputField value={value} readOnly placeholder="関数式を入力（キーボード対応）" />
        <button
          onClick={onClear}
          className="h-full px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          削除
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
