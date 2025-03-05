"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import AiAssistantsList from "@/services/AiAssistantsList";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import Header from "../_components/Header";


export type ASSISTANT ={
    id: number;
    name: string;
    title: string;
    image: string;
    instruction: string;
    userInstruction: string;
    sampleQuestions: string[];
}

export default function AIAssistants() {
    const [selectedAssistants, setSelectedAssistants] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const insertAssistants = useMutation(api.userAiAssistants.InserSelectedAiAssistants);
    const convex = useConvex();
  
    // if (!user?._id) return null;

    const toggleAssistant = (id: number) => {

        setSelectedAssistants(prev =>
            prev.includes(id)
                ? prev.filter(assistantId => assistantId !== id)
                : [...prev, id]
        );
    };

    const OnClickContinue = async () => {
        if (!user?._id || selectedAssistants.length === 0) return;

        setIsLoading(true);
        try {
            const selectedAiAssistants = AiAssistantsList.filter(
                assistant => selectedAssistants.includes(assistant.id)
            );

            await insertAssistants({
                records: selectedAiAssistants,
                uid: user._id,
            });

        } catch (error) {
            console.error("Failed to insert AI Assistants:", error);
            alert("Failed to select AI Assistants. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const GetUserAssistans = async () => {

        const result = await convex.query(api.userAiAssistants.GetAiAssistants, {
            uid: user._id
        })
        console.log(result);
        if(result.length > 0){
            router.replace('/workspace')
        }
    }


    useEffect(()=>{
        user&&GetUserAssistans()
    },[user])


    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 animate-fade-in">
            {/* Header Section */}
            <Header/>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-fade-in">
                        Welcome to the World of AI Assistants
                    </h2>
                    <p className="text-lg sm:text-xl mt-2 text-muted-foreground animate-slide-up">
                        Choose your AI Companion to Simplify Your Life
                    </p>
                </div>
                <Button
                    className="w-full sm:w-auto animate-bounce-slow hover:scale-105 transition-all duration-300"
                    disabled={selectedAssistants.length === 0 || isLoading}
                    onClick={OnClickContinue}
                >
                    {isLoading ? (
                        <>
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Continue with ${selectedAssistants.length} selected`
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-8">
                {AiAssistantsList.map((assistant, index) => (
                    <BlurFade key={assistant.id} delay={0.25 + index * 0.05} inView>
                        <div
                            className={`group relative bg-card rounded-lg shadow-sm hover:shadow-lg 
                            transition-all duration-300 ease-in-out hover:scale-[1.02]
                            animate-fade-in [animation-delay:var(--delay)] cursor-pointer
                            ${selectedAssistants.includes(assistant.id) ? 'ring-2 ring-primary' : ''}`}
                            style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                            onClick={() => toggleAssistant(assistant.id)}
                        >
                            <div className="p-3 space-y-3">
                                <div className="relative overflow-hidden rounded-lg aspect-square w-full max-w-[150px] mx-auto">
                                    <Checkbox
                                        checked={selectedAssistants.includes(assistant.id)}
                                        className="absolute top-2 right-2 z-10 h-5 w-5 bg-white/90"
                                        onCheckedChange={() => toggleAssistant(assistant.id)}
                                    />
                                    <Image
                                        src={assistant.image}
                                        alt={assistant.name}
                                        width={150}
                                        height={150}
                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="space-y-1.5">
                                    <h2 className="text-base font-medium text-center group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                        {assistant.name}
                                    </h2>
                                    <p className="text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-1">
                                        {assistant.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}



