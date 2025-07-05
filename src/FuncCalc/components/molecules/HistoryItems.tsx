type Props = {
  formula: string;
  result: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const HistoryItem = ({ formula, result, onClick, onEdit, onDelete }: Props) => {
  return (
    <li className="text-m text-slate-700">
      <p
        className="cursor-pointer hover:underline"
        onClick={onClick}
      >
        {formula} = {result}
      </p>
      <div className="flex gap-2 mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          編集
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          削除
        </button>
      </div>
    </li>
  );
};
