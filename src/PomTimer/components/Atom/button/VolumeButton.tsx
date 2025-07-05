import { Volume2, VolumeX } from "lucide-react";

type Props ={
    muted:boolean,
    onClickVolume:()=>void,
    // setMuted:React.Dispatch<React.SetStateAction<boolean>>
}

export const VolumeButton = (props:Props) => {

    const {muted,onClickVolume} =props;

    return (
        <button className="p-2" onClick={onClickVolume}>
            {muted ? (
                <VolumeX className="w-6 h-6 text-gray-700" />
            ) : (
                <Volume2 className="w-6 h-6 text-gray-700" />
            )}
        </button>
    );
};