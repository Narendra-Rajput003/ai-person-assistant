"use client"

import { GetAuthUserData } from "@/services/GlobalAPI_Services";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { AuthContext } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";



export default function Provider({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const convex = useConvex();
    const {user,setUser} = useContext(AuthContext)
    const [assistant , setAssistant]=useState()

    useEffect(() => {
        CheckUserAuth()
    }, [])

    const CheckUserAuth = async () => {
        const token = localStorage.getItem('token');
        const user = token && await GetAuthUserData(token);
        if (!user?.email) {
            router.replace('/sign-in');
            return
        }

        try {
            const result = await convex.query(api.users.GetUserInfo,{
                email:user?.email
            })
            setUser(result)
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <div>
            <AssistantContext.Provider value={{assistant,setAssistant}}>
           
            {children}
            </AssistantContext.Provider>
        </div>
    )
}