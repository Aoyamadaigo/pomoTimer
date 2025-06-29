import { useContext } from "react"
import { LoginUserContext } from "../block/LoginUserProvider"

export const useLoginUsers = () => {
    const context = useContext(LoginUserContext)
    if (!context) throw new Error("useLoginUser must be used within a LoginUserProvider");
    return context;
}