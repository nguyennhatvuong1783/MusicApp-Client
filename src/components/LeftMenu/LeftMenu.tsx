import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Library } from "../icons/Icons";
import YourLibrary from "../YourLibrary/YourLibrary";
import SubFooter from "../Footer/SubFooter";

const LeftMenu = () => {
    return (
        <div className="flex h-full flex-col gap-2">
            {/* Library sections */}
            <div className="flex-1 rounded-md bg-(--main-color)">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex cursor-pointer items-center gap-2 px-5 pt-4 pb-2 font-bold text-(--secondary-text-color) hover:text-(--text-color)">
                        <Library className="h-6 w-6" />
                        <span className="hidden md:inline">Your Library</span>
                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-350px)] px-2 pb-2">
                    <YourLibrary />
                </ScrollArea>
                <SubFooter />
            </div>
        </div>
    );
};

export default LeftMenu;
