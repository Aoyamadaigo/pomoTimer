type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => (
  <div className="text-red-400 text-sm">{message}</div>
);
