"use client";

import { AuthContext } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";


export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
     const [user,setUser]=useState()
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <ConvexProvider client={convex}>
                <AuthContext.Provider value={{user,setUser}}>
               
            <ThemeProvider 
                attribute="class" 
                defaultTheme="system"
                enableSystem
            >
                {children}
            </ThemeProvider>
            </AuthContext.Provider>
            </ConvexProvider>
        </GoogleOAuthProvider>
    );
}
