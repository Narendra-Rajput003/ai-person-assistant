import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'
import { ASSISTANT } from '../../ai-assistants/page'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Loader2, Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


import AiModelOptions from '@/services/AiModelOptions'
import AssistantAvtar from './AssistantAvtar'
import { AuthContext } from '@/context/AuthContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AssistantContext } from '@/context/AssistantContext'

interface AddNewAssistantProps {
  children: React.ReactNode;
  onAssistantAdd?: (assistant: ASSISTANT) => void;
}

const DEFAULT_ASSISTANT: ASSISTANT = {
  id: 0,
  name: '',
  title: '',
  image: '/bug-fixer.avif',
  instruction: '',
  sampleQuestions: [],
  userInstruction: '',
  aiModelId: '' // Make sure this is included
}

function AddNewAssistant({ children, onAssistantAdd }: AddNewAssistantProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const {user}=useContext(AuthContext)
  const AddAssistant=useMutation(api.userAiAssistants.InserSelectedAiAssistants)
  const [selectAssistant, setSelectAssistant] = useState<ASSISTANT>(DEFAULT_ASSISTANT)
  const {setAssistant}=useContext(AssistantContext)

  const onHandleInputChange = (field: keyof ASSISTANT, value: string) => {
    setSelectAssistant((prev:any) => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle save logic
  
  const handleSave = async () => {
    if (!selectAssistant.name.trim() || !selectAssistant.title.trim() || !selectAssistant.instruction.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setIsLoading(true)
      // Add your save logic here
      const assistantToSave = {
        ...selectAssistant,
        userInstruction: selectAssistant.instruction // Copy instruction to userInstruction
      }
      
      const result = await AddAssistant({
        records:[assistantToSave],
        uid:user?._id
      })
      toast.success('Assistant added successfully')
      setAssistant(null);     
     

      setOpen(false)
    } catch (error) {
      toast.error('Failed to save assistant')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{

  },[selectAssistant])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Assistant</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new AI assistant or choose from existing templates.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Sidebar with templates */}
          <div className="md:border-r border-border/50 pr-4">
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full mb-4 gap-2"
              onClick={() => setSelectAssistant(DEFAULT_ASSISTANT)}
            >
              <Upload className="w-4 h-4" />
              Create New
            </Button>

            <div className="space-y-1 max-h-[400px] overflow-y-auto
              scrollbar-thin scrollbar-thumb-accent/10 hover:scrollbar-thumb-accent/20
              scrollbar-track-transparent pr-2">
              {AiAssistantsList.map((assistant) => (
                <div
                  key={assistant.id}
                  onClick={() => setSelectAssistant({
                    ...assistant,
                    aiModelId: assistant.aiModelId || '' // Ensure aiModelId is included
                  })}
                  className={cn(
                    'p-3 hover:bg-accent/50 flex gap-3 items-center rounded-lg cursor-pointer transition-colors',
                    selectAssistant.id === assistant.id && 'bg-accent'
                  )}
                >
                  <Image
                    src={assistant.image}
                    alt={assistant.name}
                    className="w-10 h-10 object-cover rounded-lg ring-1 ring-border"
                    width={40}
                    height={40}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{assistant.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {assistant.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative group">
               <AssistantAvtar SelectedImage={(image:string)=>onHandleInputChange('image',image)}>
               <Image
                  src={selectAssistant.image}
                  
                  alt="Assistant avatar"
                  width={120}
                  height={120}
                  className="rounded-xl object-cover ring-1 ring-border
                    group-hover:ring-2 group-hover:ring-primary/50 transition-all
                    cursor-pointer"
                />
               </AssistantAvtar>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Assistant Name"
                    value={selectAssistant.name}
                    onChange={(e) => onHandleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Assistant Title"
                    value={selectAssistant.title}
                    onChange={(e) => onHandleInputChange('title', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ai model */}

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">AI Model</label>
              <Select defaultValue={selectAssistant.aiModelId} 
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

            

            <div className="space-y-2">
              <Label htmlFor="instruction">Instructions</Label>
              <Textarea
                id="instruction"
                placeholder="Enter instructions for the assistant..."
                value={selectAssistant.instruction}
                onChange={(e) => onHandleInputChange('instruction', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Add'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewAssistant
