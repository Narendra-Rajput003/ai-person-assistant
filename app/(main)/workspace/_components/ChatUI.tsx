"use client"

import { Input } from '@/components/ui/input'
import EmptyChatState from './EmptyChatState'
import { Button } from '@/components/ui/button'
import { Send, Loader2 } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import AiModelOptions from '@/services/AiModelOptions'
import { AssistantContext } from '@/context/AssistantContext'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'
import { ASSISTANT } from '../../ai-assistants/page'

type Message = {
    role: 'user' | 'assistant';
    content: string;
}

function ChatUI() {
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { assistant } = useContext(AssistantContext)
    const [messages, setMessages] = useState<Message[]>([])
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updatedTokens = useMutation(api.users.updateTokens)
    const {user, setUser} = useContext(AuthContext)

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        const scrollToBottom = () => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                })
            }
        }
        scrollToBottom()
    }, [messages])

    // Reset messages when assistant changes
    useEffect(() => {
        setMessages([])
    }, [assistant?.id])

    const getSystemPrompt = (assistant: any) => {
        const basePrompt = `You are ${assistant.name}, ${assistant.title}. ${assistant.instruction}`;
        
        const roleSpecificPrompts = {
            // Fitness Coach (Jack)
            "fitness-coach": `${basePrompt}
                When answering:
                - Provide specific, actionable workout plans
                - Include exercise details (sets, reps, form)
                - Focus on safety and proper progression
                - Give scientific reasoning when relevant
                - Include nutrition advice when appropriate`,

            // Grammar Fixer (Emma)
            "grammar-fixer": `${basePrompt}
                When answering:
                - Focus on grammar and language improvement
                - Explain corrections clearly
                - Provide examples when helpful
                - Maintain original meaning while improving structure
                - Consider context and tone`,

            // Email Writer (Olivia)
            "email-writer": `${basePrompt}
                When answering:
                - Write professional and context-appropriate emails
                - Maintain proper email etiquette
                - Adjust tone based on recipient
                - Include subject lines when needed
                - Structure content clearly`,

            // YouTube Script Writer (Liam)
            "youtube-script": `${basePrompt}
                When answering:
                - Create engaging video scripts
                - Include hooks and calls-to-action
                - Structure content for verbal delivery
                - Consider pacing and timing
                - Add visual cues when relevant`,

            // Code Writer (Harry)
            "code-writer": `${basePrompt}
                When answering:
                - Write clean, efficient code
                - Include comments and documentation
                - Follow best practices
                - Consider edge cases
                - Explain the implementation logic`
        };

        // Extract role from assistant.title or use a role identifier
        const role = assistant.title.toLowerCase().replace(/\s+/g, '-');
        return roleSpecificPrompts[role] || basePrompt;
    };

    const handleAIResponse = async (userMessage: string) => {
        if (!assistant?.aiModelId) {
            toast.error('Please select an AI model first')
            return
        }

        try {
            setIsLoading(true)
            const userMessageObj: Message = { role: 'user', content: userMessage }
            setMessages(prev => [...prev, userMessageObj])

            const AIModel = AiModelOptions.find(item => item.edenAi === assistant.aiModelId)
            if (!AIModel) throw new Error('AI Model not found')

            // Get the appropriate system prompt based on assistant type
            const systemPrompt = getSystemPrompt(assistant)

            // Model-specific settings
            const modelSettings = {
                'google': { temperature: 0.7, max_tokens: 1000 },
                'anthropic': { temperature: 0.7, max_tokens: 1500 },
                'openai': { temperature: 0.8, max_tokens: 800 },
                'mistral': { temperature: 0.7, max_tokens: 1200 }
            };

            const settings = modelSettings[AIModel.edenAi] || { temperature: 0.7, max_tokens: 1000 };

            const response = await axios.post('/api/edin-ai-model', {
                provider: AIModel.edenAi,
                prompt: userMessage,
                systemPrompt: systemPrompt,
                ...settings,
                conversationHistory: messages.slice(-4)
            })

            if (!response.data?.content) {
                throw new Error('Invalid AI response')
            }

            // Validate response based on assistant type
            validateResponse(response.data.content, assistant.title);

            setMessages(prev => [...prev, response.data])
            updateUserTokens(response.data.content)
            setInput('')
        } catch (error) {
            console.error('AI Response Error:', error)
            toast.error(`Failed to get a valid ${assistant.title} response. Please try again.`)
            setMessages(prev => prev.slice(0, -1))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendMessage = () => {
        if (!assistant) {
            toast.error('Please select an assistant first')
            return
        }

        if (!input.trim()) return
        handleAIResponse(input.trim())
    }

    // New function to handle sample question clicks
    const handleSampleQuestion = (question: string) => {
        if (!assistant) {
            toast.error('Please select an assistant first')
            return
        }
        handleAIResponse(question)
    }

    const updateUserTokens = async(resp: string) => {
        const tokenCount = resp.trim() ? resp.trim().split(/\s+/).length : 0
        
        await updatedTokens({
            credits: user?.credits - tokenCount,
            uid: user?._id
        })

        setUser((prev: ASSISTANT) => ({
            ...prev,
            credits: user?.credits - tokenCount
        }))
    }

    const validateResponse = (content: string, assistantType: string) => {
        const validations = {
            'Fitness Coach': (text: string) => 
                text.toLowerCase().includes('workout') || 
                text.toLowerCase().includes('exercise'),
            
            'Grammar Fixer': (text: string) => 
                text.toLowerCase().includes('correction') || 
                text.toLowerCase().includes('grammar'),
            
            'Email Writer': (text: string) => 
                text.toLowerCase().includes('dear') || 
                text.toLowerCase().includes('sincerely') ||
                text.toLowerCase().includes('regards'),
            
            'YouTube Script': (text: string) => 
                text.toLowerCase().includes('intro') || 
                text.toLowerCase().includes('script') ||
                text.toLowerCase().includes('outro'),
            
            'Code Writer': (text: string) => 
                text.includes('{') || 
                text.includes('function') ||
                text.includes('class')
        };

        const validator = validations[assistantType];
        if (validator && !validator(content)) {
            throw new Error('Response validation failed');
        }
    };

    return (
        <div className="relative flex flex-col h-[calc(100vh-6rem)] bg-gradient-to-b from-background/50 via-background to-background/80">
            {/* Chat messages container */}
            <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8
                    scrollbar-thin scrollbar-track-transparent
                    scrollbar-thumb-accent hover:scrollbar-thumb-accent/80
                    scroll-smooth"
            >
                <div className="max-w-4xl mx-auto py-6 space-y-6">
                    {messages.length === 0 ? (
                        <EmptyChatState onQuestionClick={handleSampleQuestion} />
                    ) : (
                        messages.map((msg, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    "flex items-start gap-3 animate-slide-up",
                                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                )}
                            >
                                {msg.role === 'assistant' && assistant?.image && (
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={assistant.image}
                                            alt={assistant.name || 'Assistant'}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover ring-2 ring-border"
                                            priority
                                        />
                                    </div>
                                )}
                                
                                <div className={cn(
                                    "px-4 py-2 rounded-2xl max-w-[80%] break-words",
                                    msg.role === 'user' 
                                        ? 'bg-primary text-primary-foreground ml-auto' 
                                        : 'bg-muted text-muted-foreground'
                                )}>
                                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                        {msg.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Input container */}
            <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/30 pt-4">
                <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 max-w-4xl mx-auto">
                    <div className="relative flex items-end gap-2 p-3 rounded-xl
                        bg-card/80 backdrop-blur-xl
                        border border-border/50
                        shadow-lg transition-all duration-300
                        hover:border-border group">
                        <Input
                            ref={inputRef}
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                            className="flex-1 min-h-[44px] bg-transparent border-none
                                text-base leading-relaxed placeholder:text-muted-foreground/50
                                focus-visible:ring-0 focus-visible:ring-offset-0"
                            disabled={isLoading}
                            maxLength={1000}
                        />

                        <Button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            size="icon"
                            className="h-11 w-11 rounded-xl shrink-0
                                bg-primary hover:bg-primary/90
                                transition-all duration-300
                                hover:scale-105 active:scale-95
                                disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    {/* Mobile keyboard spacer */}
                    <div className="h-safe-area-bottom sm:hidden" />
                </div>
            </div>
        </div>
    )
}

export default ChatUI
