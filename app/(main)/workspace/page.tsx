import AssistantSetting from "./_components/AssistantSetting";
import AssitantsList from "./_components/AssitantsList";

export default function WorkSpace() {
    return (
        <div className="min-h-screen w-full bg-background">
            {/* Main container with max width and padding */}
            <div className="mx-auto max-w-[2000px] h-[calc(100vh-1rem)] p-2 sm:p-4">
                {/* Grid layout with responsive columns */}
                <div className="grid h-full grid-cols-1 md:grid-cols-12 gap-4 rounded-xl">
                    {/* Sidebar - Assistants List */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2 bg-card rounded-xl shadow-sm border border-border">
                        <AssitantsList />
                    </div>

                    {/* Main Chat Area */}
                    <div className="col-span-1 md:col-span-9 lg:col-span-7 bg-card rounded-xl shadow-sm border border-border p-4">
                        <div className="flex flex-col h-full">
                            {/* Chat Header */}
                            <div className="border-b border-border pb-4">
                                <h2 className="text-xl font-semibold text-foreground">Chat UI</h2>
                            </div>

                            {/* Chat Messages Area */}
                            <div className="flex-grow overflow-y-auto my-4">
                                {/* Chat messages will go here */}
                            </div>

                            {/* Chat Input Area */}
                            <div className="border-t border-border pt-4">
                                <div className="flex items-center gap-2 bg-background rounded-lg p-2">
                                    <input 
                                        type="text" 
                                        placeholder="Type your message..." 
                                        className="flex-1 bg-transparent border-none focus:outline-none text-foreground"
                                    />
                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    
                       <AssistantSetting/>
                
                </div>
            </div>
            
        </div>
    
    );
}
