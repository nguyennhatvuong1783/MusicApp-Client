"use client";
import React, { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import { ScrollArea } from "../ui/scroll-area";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import ChatButton from "../Chat/chat-button";
import ChatBox from "../Chat/chat-box";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const currentPath = usePathname();
    const isMobile = false;

    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="flex h-fit w-full flex-1 overflow-hidden"
        >
            {/* Left sidebar */}
            <ResizablePanel
                defaultSize={20}
                minSize={isMobile ? 0 : 19}
                maxSize={28}
            >
                <LeftMenu />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-(--primary-color)" />

            {/* Main content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <div className="h-full overflow-hidden rounded-md bg-(image:--gradient-color)">
                    <ScrollArea
                        key={currentPath}
                        className="h-[calc(100vh-70px)]"
                    >
                        {Content}
                        {/* Floating Chat Button */}
                        <ChatButton isOpen={isChatOpen} onClick={toggleChat} />

                        {/* Chat Box */}
                        {isChatOpen && <ChatBox />}
                        <Footer />
                    </ScrollArea>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default MainContent;
