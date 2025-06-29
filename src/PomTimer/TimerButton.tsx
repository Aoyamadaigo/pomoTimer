import React, { type ReactNode } from "react"
import { motion } from "framer-motion";

type Props = {
    children: ReactNode,
    onClick: () => void
}


export const TimerButton = React.memo((props: Props) => {
    const { children, onClick } = props;
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-[90px] py-4 font-bold text-slate-800 bg-white
      shadow-md rounded-full hover:bg-gray-100 transition sm:text-base"
            onClick={onClick}
        >

            {children}
        </motion.button>
    );
});