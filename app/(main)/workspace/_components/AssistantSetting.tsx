"use client"
import { AssistantContext } from '@/context/AssistantContext'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Image from 'next/image'
import React, { useContext } from 'react'
import AiModelOptions from '@/services/AiModelOptions'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Save, Trash } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import ConfirmationAlert from '../ConfirmationAlert'
import { useRouter } from 'next/navigation'

function AssistantSetting() {
    const router = useRouter()
    const { assistant, setAssistant } = useContext(AssistantContext)
    const updateAiAssistant = useMutation(api.userAiAssistants.UpdateUserAiAssistants)
    const deleteAiAssistant = useMutation(api.userAiAssistants.deleteAiAssistants)
    const [loading, setLoading] = React.useState(false)


    const onHandleInputChange = (feild:string,value:string)=>{
        setAssistant((prev:any)=>({
            ...prev,
            [feild]:value
        }))
        
    }

    const OnSave = async()=>{
        setLoading(true)
         await updateAiAssistant({
            id:assistant?._id,
            userInstruction:assistant?.userInstruction,
            aiModelId:assistant?.aiModelId,
        })
        toast('Save!')
        setLoading(false)
        
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteAiAssistant({ id: assistant._id })
            setAssistant(null) // Clear the current assistant from context
            toast.success('Assistant deleted successfully')
            router.refresh() // This will trigger a re-render of the page with fresh data

        } catch (error) {
            toast.error('Failed to delete assistant')
        }
        setLoading(false)
    }

    
    

    return (
        < div className="hidden lg:block lg:col-span-3 bg-card rounded-xl shadow-sm border border-border p-4 bg-slate-100">
            <div className="sticky top-4">
                <h2 className="text-xl font-semibold text-foreground mb-4">Settings</h2>
                <div className='mt-4'>
                    {
                        assistant?.image && (
                            <Image
                                src={assistant?.image}
                                alt={assistant?.name}
                                width={100}
                                height={100}
                                className="rounded-xl object-cover"
                            />
                        )
                    }
                </div>
                <div >
                    <h2 className='text-lg font-semibold text-foreground'>{assistant?.name}</h2>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>{assistant?.title}</p>
                </div>
            </div>

            <div className="space-y-3 mt-4">
                    <label className="text-sm font-medium text-foreground">AI Model</label>
                    <Select defaultValue={assistant?.aiModelId} 
                    onValueChange={(value)=>onHandleInputChange('aiModelId',value)}
                    >
                        <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Choose AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {AiModelOptions?.map((option) => (
                                <SelectItem 
                                    key={option.id} 
                                    value={option.edenAi}
                                    className="flex items-center gap-2 py-2.5 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={option.logo}
                                            alt={option.name}
                                            width={20}
                                            height={20}
                                            className="rounded-md"
                                        />
                                        <span>{option.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            <div className='mt-4 space-y-2'>
                <h2 className='text-lg font-semibold text-foreground'>Instruction:</h2>
                <Textarea placeholder='Add Instruction' className='h-[180px] bg-white' value={assistant?.userInstruction}
                onChange={(e)=>onHandleInputChange('userInstruction',e.target.value)}
                />
            </div>

            <div className="absolute bottom-10">
                <div className="flex items-center gap-3 justify-end">
                    <ConfirmationAlert OnDelete={handleDelete}>
                        {/* Remove the Button wrapper since AlertDialogTrigger will render as a button */}
                        <div className="flex items-center gap-2">
                            <Trash className="w-4 h-4" />
                            Delete
                        </div>
                    </ConfirmationAlert>
                    <Button 
                        size="sm"
                        className="gap-2"
                        onClick={OnSave}
                        disabled={loading}
                    >
                        {loading ? <Loader2Icon className='animate-spin'/> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default AssistantSetting
