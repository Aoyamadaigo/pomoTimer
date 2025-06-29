import React, { useCallback, useState } from "react";
import { LoginUserProvider } from "./LoginUserProvider";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {

    const [inputId, setInputId] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");

    const {login,loading,isAdmin} = useAuth();

    const onClickLogin=useCallback((usrId:string)=>{
        if(usrId === ""){
            alert("ユーザーIDを入力してください")
        }else{
            login(usrId)
        }   
    },[login])

    const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputId(e.target.value)
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value)
    }

    return (

        <div className="min-h-screen flex align-center justify-center items-center ">
            <div className="border-2 rounded-lg border-blue-200 p-7 shadow flex flex-col  space-y-7">
                <h2 className="text-2xl text-center">ログイン</h2>
                <input placeholder="IDを入力してください"
                    className="border-2 p-2"
                    onChange={onChangeId} />
                <input placeholder="パスワードを入力してください"
                    className="border-2 p-2"
                    onChange={onChangePassword} />
                <button className="border-2 border-blue-200 p-4 rounded-lg"
                onClick={()=>onClickLogin(inputId)}
                >ログインする</button>
            </div>
        </div>
    )
}