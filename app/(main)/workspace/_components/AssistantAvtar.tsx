"use client"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import AiAssistantsList from '@/services/AiAssistantsList'
import Image from 'next/image'

function AssistantAvtar({children,SelectedImage}:any) {

   

  return (
    <Popover>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
            {
                AiAssistantsList.map((assistant)=>(
                    <div key={assistant.id}>
                        <Image src={assistant.image} alt={assistant.name} 
                        width={80} height={80}
                        className='rounded-lg w-[30px] h-[30px] object-cover cursor-pointer' 
                        onClick={()=>SelectedImage(assistant.image)}
                        />
                    </div>
                ))
            }
        </div>
    </PopoverContent>
  </Popover>
  
  )
}

export default AssistantAvtar