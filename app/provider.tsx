"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";


export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
            <ConvexProvider client={convex}>
            <ThemeProvider 
                attribute="class" 
                defaultTheme="light"
                forcedTheme="light"
                enableSystem={false}
            >
                {children}
            </ThemeProvider>
            </ConvexProvider>
        </GoogleOAuthProvider>
    );
}
