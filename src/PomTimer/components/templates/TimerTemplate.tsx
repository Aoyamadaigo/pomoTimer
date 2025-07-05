import { TimerButton } from "../Atom/button/TimerButton";
import { ProgressRings } from "../MoleCule/ProgressRings";
import { TimerDisplay } from "../Atom/TimerDisplay";
import { formatTime } from "../../utils/formatTime";

type Props = {
    totalTime: number;
    mode: "focus" | "break";
    focusDuration: number;
    onClickTime: (min: number) => void;
    onClickControl: (value: string) => void;
    bgColorClass: string;
    textColorClass: string;
};

export const TimerTemplate = ({
    totalTime,
    mode,
    focusDuration,
    onClickTime,
    onClickControl,
    bgColorClass,
    textColorClass,
}: Props) => {
    return (
        <div className={`flex-1 flex flex-col justify-center items-center ${bgColorClass} p-4 sm:p-6 md:p-8 lg:p-12`} style={{ height: 'calc(100vh - 60px)' }}>
            <div className="w-full max-w-md flex justify-center gap-4 sm:gap-4 md:gap-6">
                {[30, 60, 90, 120].map((min) => (
                    <TimerButton key={min} onClick={() => onClickTime(min)}>
                        {min}分
                    </TimerButton>
                ))}
            </div>

            <div className="relative flex items-center justify-center" style={{ width: 'min(80vw, 320px)', height: 'min(80vw, 320px)' }}>
                <ProgressRings totalBars={60} progressRatio={totalTime / focusDuration} radius={120} />
                <TimerDisplay value={formatTime(totalTime)} className={textColorClass} />
            </div>

            <div className="w-full mt-4 max-w-md flex justify-center gap-4 sm:gap-6 md:gap-8">
                {['開始', '停止', 'リセット', '削除'].map((label) => (
                    <TimerButton key={label} onClick={() => onClickControl(label)}>
                        {label}
                    </TimerButton>
                ))}
            </div>
        </div>
    );
};
