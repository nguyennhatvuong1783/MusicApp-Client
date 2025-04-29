import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import LeftMenu from "../LeftMenu/LeftMenu";
import { ScrollArea } from "../ui/scroll-area";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";

interface MainContentProps {
    Content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ Content }) => {
    const currentPath = usePathname();
    const isMobile = false;

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
                        <Footer />
                    </ScrollArea>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default MainContent;
