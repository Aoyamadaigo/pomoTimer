type Props = {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({ value, placeholder, readOnly = false, onChange }: Props) => {
  return (
    <input
      className="w-full px-3 py-2 text-base rounded bg-white text-black"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};
