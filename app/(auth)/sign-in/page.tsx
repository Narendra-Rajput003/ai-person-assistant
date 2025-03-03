"use client";

import { GetAuthUserData } from "@/services/GlobalAPI_Services";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image from "next/image";


export default function SignIn() {

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse)=>{
            console.log(tokenResponse);
             if(typeof window!==undefined){
                localStorage.setItem('token',tokenResponse.access_token)
            }
            const user = GetAuthUserData(tokenResponse.access_token)

            //save the user info 
            
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
