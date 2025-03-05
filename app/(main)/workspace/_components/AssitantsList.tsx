"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ASSISTANT } from "../../ai-assistants/page";

export default function AssistantsList() {
    const convex = useConvex();
    const { user } = useContext(AuthContext);
    const { assistant, setAssistant } = useContext(AssistantContext);
    const [assistants, setAssistants] = useState<ASSISTANT[]>([]);

    const GetUserAssistans = async () => {
        const result = await convex.query(api.userAiAssistants.GetAiAssistants, {
            uid: user?._id
        });
        setAssistants(result);
    }

    useEffect(() => {
        user && GetUserAssistans();
    }, [user]);

    return (
        <div className="flex flex-col h-full bg-card bg-slate-100">
            {/* Header Section */}
            <div className="p-4 space-y-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                    Your AI Assistants
                </h2>
                <Button 
                    className="w-full justify-start gap-2 bg-primary/10 hover:bg-primary/20 text-primary"
                    variant="ghost"
                >
                    <PlusCircle className="h-5 w-5" />
                    Add New Assistant
                </Button>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        className="pl-8 bg-background/50 border-border focus-visible:ring-1 focus-visible:ring-primary/30"
                        placeholder="Search assistants..."
                    />
                </div>
            </div>

            {/* Assistants List Section */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-2">
                    {assistants.map((assistant_) => (
                        <div
                            key={assistant_.id}
                            onClick={() => setAssistant(assistant_)}
                            className={`
                                group flex items-center gap-3 p-3 rounded-lg cursor-pointer
                                transition-all duration-200 ease-in-out
                                hover:bg-accent hover:shadow-sm
                                ${assistant_.id === assistant?.id ? 
                                    'bg-accent shadow-sm ring-1 ring-primary/20' : 
                                    'hover:translate-x-1'
                                }
                            `}
                        >
                            <div className="relative h-12 w-12 shrink-0">
                                <Image
                                    src={assistant_.image}
                                    alt={assistant_.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground truncate">
                                    {assistant_.name}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">
                                    {assistant_.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Indicator - Only visible on small screens */}
            <div className="md:hidden p-4 text-center border-t border-border">
                <p className="text-sm text-muted-foreground">
                    Swipe right to view assistants
                </p>
            </div>
            {/* Footer Section */}
            <div className="mt-auto p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                    {/* Credits Section */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-background/50 rounded-full">
                        <div className="size-2 bg-primary/20 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-foreground">
                            {user?.credits || 0} Credits
                        </span>
                    </div>

                    {/* User Profile Section */}
                    <div className="flex items-center gap-3">
                        {user?.picture && (
                            <div className="relative">
                                <Image 
                                    src={user?.picture} 
                                    alt="User profile" 
                                    width={38} 
                                    height={38} 
                                    className="rounded-full ring-2 ring-border hover:ring-primary/20 transition-all duration-200"
                                />
                                <div className="absolute bottom-0 right-0 size-2.5 bg-primary rounded-full ring-2 ring-card" />
                            </div>
                        )}
                        <div className="hidden sm:flex flex-col">
                            <h2 className="text-sm font-medium text-foreground truncate max-w-[120px]">
                                {user?.name}
                            </h2>
                            <span className={`text-xs ${user?.orderId ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                                {user?.orderId ? '✨ Premium' : 'Free Plan'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
