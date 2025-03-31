import React from "react";
import Button from "../Buttons/Button";

interface SubLibraryProps {
    title?: string;
    subTitle?: string;
    textBtn?: string;
}

const SubLibrary: React.FC<SubLibraryProps> = ({
    title = "Title",
    subTitle = "Sub Title",
    textBtn = "Button",
}) => {
    return (
        <div className="my-6 flex flex-col justify-center gap-5 rounded-md bg-(--secondary-color) px-5 py-4">
            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold">{title}</span>
                <span className="text-sm">{subTitle}</span>
            </div>
            <Button
                className="h-8 self-start px-4 py-1 text-sm font-bold"
                text={textBtn}
            />
        </div>
    );
};

export default SubLibrary;
