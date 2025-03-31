import React from "react";

interface TextButtonProps {
    text: string;
    href: string;
}

const TextButton: React.FC<TextButtonProps> = ({ text, href }) => {
    return (
        <a
            href={href}
            className="text-(--secondary-text-color) transition duration-100 hover:-translate-y-[1px] hover:scale-105 hover:text-(--text-color) active:-translate-y-0 active:scale-100 active:opacity-50"
        >
            {text}
        </a>
    );
};

export default TextButton;
