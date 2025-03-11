"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { AssistantContext } from "@/context/AssistantContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { LogOut, PlusCircle, Search, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ASSISTANT } from "../../ai-assistants/page";
import { BlurFade } from "@/components/magicui/blur-fade";
import AddNewAssistant from "./AddNewAssistant";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Profile from "./Profile";


export default function AssistantsList() {
    const convex = useConvex();
    const { user } = useContext(AuthContext);
    const { assistant, setAssistant } = useContext(AssistantContext);
    const [assistants, setAssistants] = useState<ASSISTANT[]>([]);
    const [open, setOpen] = useState(false);

    const GetUserAssistans = async () => {
        const result = await convex.query(api.userAiAssistants.GetAiAssistants, {
            uid: user?._id
        });
        setAssistants(result);
    }



    useEffect(() => {
        user && GetUserAssistans();
    }, [user && assistant == null]);

    return (
        <div className="flex flex-col h-full bg-card bg-slate-100">
            {/* Header Section */}
            <div className="p-4 space-y-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">
                    Your AI Assistants
                </h2>
                <AddNewAssistant>
                    <Button className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Add New Assistant
                    </Button>
                </AddNewAssistant>
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
                        <BlurFade key={assistant_.id} delay={0.25 + assistant_.id * 0.05} inView>
                            <div

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
                        </BlurFade>
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
                        
                    </div>

                    {/* User Profile Section */}
                    <div className="flex items-center gap-3">
                        {user?.picture && (
                            <div className="relative group cursor-pointer">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <Image
                                    src={user?.picture}
                                    alt="User profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full ring-2 ring-border hover:ring-primary/20 transition-all duration-200 relative
                                    hover:scale-105 transform object-cover z-10"
                                />
                                <div className="absolute bottom-0 right-0 z-20">
                                    <span className="flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary ring-2 ring-card"></span>
                                    </span>
                                </div>
                            </div>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hidden sm:flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                    <h2 className="text-sm font-medium text-foreground truncate max-w-[120px] group-hover:text-primary transition-colors">
                                        {user?.name}
                                    </h2>
                                    <span className={`text-xs flex items-center gap-1.5 
                                        ${user?.orderId 
                                            ? 'text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full' 
                                            : 'text-muted-foreground'}`}>
                                        {user?.orderId ? (
                                            <>
                                                <span className="animate-pulse">✨</span>
                                                Premium
                                            </>
                                        ) : 'Free Plan'}
                                    </span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 animate-in slide-in-from-top-2">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={()=>setOpen(true)}>
                                    <UserCircle2 className="h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                                    onClick={() => localStorage.removeItem('token')}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Profile openDialog={open} onClose={()=>setOpen(false)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
