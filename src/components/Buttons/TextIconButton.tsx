import Link from "next/link";
import React from "react";

interface TextIconButtonProps {
    text?: string;
    url?: string;
    Icon?: React.ReactNode | null;
}

const TextIconButton: React.FC<TextIconButtonProps> = ({
    text = "Button",
    url = "#",
    Icon = null,
}) => {
    return (
        <div className="rounded-full p-1 transition-all duration-300 focus-within:ring-3">
            <Link
                href={url}
                className="flex items-center justify-center rounded-full border border-(--secondary-text-color) px-[20px] py-[7px] outline-none hover:ring-1 active:opacity-70 active:ring-0 md:px-[31px]"
            >
                {Icon && Icon}
                <span className="flex-1 text-center font-bold md:mx-5 md:my-1">
                    {text}
                </span>
            </Link>
        </div>
    );
};

export default TextIconButton;
