import axios from "axios"
import type { User } from "../type/user";
import { useCallback, useState } from "react";

export const useAllUsers = useCallback(() => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get<User[] | null>("https://jsonplaceholder.typicode.com/users/");
            const users = res.data;
            setUsers(users);
        } catch {
            alert("ユーザー情報が取得できませんでした")
        } finally {
            setLoading(false)
        }
    }
    return { getUsers, users, loading }
}, [])