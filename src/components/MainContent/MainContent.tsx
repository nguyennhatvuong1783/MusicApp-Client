import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import Chat from "../Chat/Chat";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const isMobile = false;

    return (
        <div className="fixed inset-0 mt-14 flex flex-col">
            <ResizablePanelGroup
                direction="horizontal"
                className="flex h-full flex-1 overflow-hidden p-2"
            >
                {/* Left sidebar */}
                <ResizablePanel
                    defaultSize={25}
                    minSize={isMobile ? 0 : 19}
                    maxSize={28}
                >
                    <LeftMenu />
                </ResizablePanel>

                <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

                {/* Main content */}
                <ResizablePanel defaultSize={isMobile ? 80 : 55}>
                    {Content}
                </ResizablePanel>

                <ResizableHandle className="w-2 rounded-lg bg-black transition-colors" />

                {/* Right sidebar */}
                <ResizablePanel
                    defaultSize={20}
                    minSize={0}
                    maxSize={25}
                    collapsedSize={0}
                >
                    <Chat />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default MainContent;
