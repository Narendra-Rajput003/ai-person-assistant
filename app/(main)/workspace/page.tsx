import AssistantSetting from "./_components/AssistantSetting";
import AssitantsList from "./_components/AssitantsList";
import ChatUI from "./_components/ChatUI";

export default function WorkSpace() {
    return (
        <div className="min-h-screen w-full bg-background transition-colors duration-300 animate-fade-in">
            {/* Main container with max width and padding */}
            <div className="mx-auto max-w-[2000px] h-[calc(100vh-1rem)] p-2 sm:p-4 animate-slide-up">
                {/* Grid layout with responsive columns */}
                <div className="grid h-full grid-cols-1 md:grid-cols-12 gap-4 rounded-xl transition-all duration-300">
                    {/* Assistants List Panel - with smooth reveal animation */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2 bg-card rounded-xl 
                        shadow-lg border border-border/50 backdrop-blur-sm
                        transition-all duration-300 ease-in-out
                        hover:shadow-xl hover:border-border
                        animate-slide-left [animation-delay:200ms]
                        overflow-hidden">
                        <AssitantsList />
                    </div>

                    {/* Main Chat Area - with scale animation */}
                    <div className="col-span-1 md:col-span-6 lg:col-span-7 
                        transition-transform duration-300 ease-in-out
                        animate-scale-up [animation-delay:400ms]">
                        <ChatUI />
                    </div>

                    {/* Settings Panel - with slide-in animation */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-3 bg-card rounded-xl 
                        shadow-lg border border-border/50 backdrop-blur-sm
                        transition-all duration-300 ease-in-out
                        hover:shadow-xl hover:border-border
                        animate-slide-right [animation-delay:600ms]
                        overflow-hidden">
                        <AssistantSetting />
                    </div>
                </div>
            </div>
        </div>
    );
}
