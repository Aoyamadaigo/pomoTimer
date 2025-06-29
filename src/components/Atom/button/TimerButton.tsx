import type { ReactNode } from "react"

type Props = {
    children: ReactNode
    onClick: () => void
}

export const TimerButton = (props: Props) => {

    const { children, onClick } = props;

    return (
        <button className="text-2xl font-bold pointer:cursol " 
        onClick={onClick}>{children}</button>
    )
}