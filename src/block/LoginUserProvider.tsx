import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { User } from "../type/user";


type LoginUser = User & {isAdmin:boolean}|null 

type LoginUserContextType = {
    loginUser:LoginUser|null;
    setLoginUser:Dispatch<SetStateAction<LoginUser|null>>
}

export const LoginUserContext = createContext<LoginUserContextType|undefined>(undefined);

export const LoginUserProvider = (props:{children:ReactNode})=>{
    const {children} = props;
    const [loginUser,setLoginUser] = useState<LoginUser|null>(null)

    return(
        <LoginUserContext.Provider value ={{loginUser,setLoginUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}

