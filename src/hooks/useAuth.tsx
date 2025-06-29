import { useState } from "react";
import { useNavigate } from "react-router-dom"
import type { User } from "../type/user";
import { useLoginUsers } from "./useLoginUsers";
import axios from "axios";

export const useAuth =()=>{
    const navigate=useNavigate();
    const [loading,setLoading] = useState<boolean>(false);
    const [isAdmin,setIsAdmin] = useState<boolean>(false);
    const {setLoginUser} = useLoginUsers(); 

    const login = (async(id:string)=>{

        try{
            const res = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
            if(res.data){
                const isAdmin = res.data.id === 10;
                setLoginUser({...res.data,isAdmin})
                navigate("/home");
            }else{
                
            }
        }catch{

        }finally{
            setLoading(false)
        }
    })

    return{login,loading,isAdmin};
}

