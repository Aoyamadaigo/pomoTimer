import { VolumeButton } from "../Atom/button/VolumeButton";
import { SettingButton } from "../Atom/button/settingButton";

type Props = {
    isOpen: boolean,
    muted: boolean,
    onClickOpen: () => void,
    onClickClose: () => void,
    onClickVolume: () => void
}

export const Header = (props: Props) => {
    const { isOpen, muted, onClickOpen, onClickClose, onClickVolume } = props;


    return (
        <div className="flex justify-end pr-3">
            <VolumeButton muted={muted} onClickVolume={onClickVolume} />
            <SettingButton isOpen={isOpen} onClickOpen={onClickOpen} onClickClose={onClickClose} />
        </div>
    )

}