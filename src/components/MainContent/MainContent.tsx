"use client";
import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import PlayerBar from "../PlayerBar/PlayerBar";
import { useAuth } from "@/hooks/useAuth";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const isMobile = false;
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <div className="fixed inset-0 mt-14 flex flex-col">
            <ResizablePanelGroup
                direction="horizontal"
                className="flex h-full flex-1 overflow-hidden p-2"
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
                    {Content}
                </ResizablePanel>
            </ResizablePanelGroup>
            {isAuthenticated && !isLoading && <PlayerBar />}
        </div>
    );
};

export default MainContent;
