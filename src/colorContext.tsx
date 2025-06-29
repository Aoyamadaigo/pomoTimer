import { createContext, useContext, useState, type ReactNode } from "react";

type ColorContextType = {
    color: string,
    setColor: (color: string) => void
    colorDeep:string,
    setColorDeep:(colorDeep:string) =>void

}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: ReactNode }) => {

    const [color, setColor] = useState<string>("teal")
    const [colorDeep,setColorDeep]=useState<string>("200")

    return (

        <ColorContext.Provider value={{ color, setColor ,colorDeep,setColorDeep}}>
            {children}
        </ColorContext.Provider>
    )
};

export const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error("ColorContext not found");
    }
    return context;
}

