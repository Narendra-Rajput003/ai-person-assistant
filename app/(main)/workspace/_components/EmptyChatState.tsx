"use client"

import { BlurFade } from '@/components/magicui/blur-fade'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { AssistantContext } from '@/context/AssistantContext'
import { ChevronRight } from 'lucide-react'
import React, { useContext } from 'react'

interface EmptyChatStateProps {
    onQuestionClick: (question: string) => void;
}

function EmptyChatState({ onQuestionClick }: EmptyChatStateProps) {
    const { assistant } = useContext(AssistantContext)

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8 animate-fade-in">
            {/* Heading with enhanced styling and responsive text size */}
            <div className="w-full max-w-2xl mx-auto mb-12">
                <SparklesText 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center " 
                    text="How can I Assist You?" 
                />
                <p className="mt-4 text-center text-muted-foreground text-sm sm:text-base animate-fade-in [animation-delay:200ms]">
                    Select a question below or type your own
                </p>
            </div>

            {/* Questions container with responsive grid */}
            <div className="w-full max-w-2xl space-y-3 sm:space-y-4">
                {assistant?.sampleQuestions?.map((question: string, index: number) => (
                    <BlurFade 
                        key={index} 
                        delay={0.25 + index * 0.05} 
                        inView
                        className="w-full"
                    >
                        <div className="group relative w-full transition-all duration-300 ease-in-out">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <button 
                                onClick={() => onQuestionClick(question)}
                                className="w-full p-4 sm:p-5 text-sm sm:text-base border border-border/50 
                                    rounded-lg bg-card/50 backdrop-blur-sm shadow-sm
                                    hover:shadow-md hover:border-primary/30 hover:scale-[1.01]
                                    transition-all duration-300 ease-in-out
                                    flex justify-between items-center gap-4 sm:gap-6
                                    text-left text-foreground/90 hover:text-foreground"
                            >
                                <span className="flex-1 line-clamp-2">{question}</span>
                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary 
                                    transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </BlurFade>
                )) || (
                    <p className="text-center text-muted-foreground">
                        Please select an AI assistant to start chatting
                    </p>
                )}
            </div>
        </div>
    )
}

export default EmptyChatState
