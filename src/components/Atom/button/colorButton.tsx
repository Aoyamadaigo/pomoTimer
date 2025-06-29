type Props = {
    color: string;
    colorDeep: string;
    onClickColor: (color: string) => void;
    selectedColor: string;
};

export const ColorButton = (props: Props) => {
    const { color, colorDeep, onClickColor, selectedColor } = props;

    return (
        <button
            className={`bg-${color}-${colorDeep} rounded-xl p-7 w-5 
        ${color === selectedColor ? ' ring-4 ' : 'border-2 border-gray-400'}`}
            onClick={() => onClickColor(color)}
        />
    );
};