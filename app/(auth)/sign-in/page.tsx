"use client";

import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalAPI_Services";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default function SignIn() {

  const CreateUser = useMutation(api.users.CreateUser);
  const router = useRouter()
  const {user,setUser}=useContext(AuthContext)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse)=>{
             if(typeof window!==undefined){
                localStorage.setItem('token',tokenResponse.access_token)
            }
            const user =await GetAuthUserData(tokenResponse.access_token)

            //save the user info 

           const result = await CreateUser({
            name:user?.name,
            email:user?.email,
            picture:user?.picture,
           })

          setUser(result)
          router.replace('/ai-assistants')


            
        },
    onError: (errorResponse)=>{
        console.log(errorResponse);
    },
      });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 border rounded-2xl p-10 shadow-md">
        <Image src={'/logo.svg'}
        alt="logo"
        width={50}
        height={50}
        />
        <h2 className="text-2xl">Sign In to AI Personal Assistant </h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>googleLogin()}>Sign In with Google</button>
      </div>
    </div>
  );
}
