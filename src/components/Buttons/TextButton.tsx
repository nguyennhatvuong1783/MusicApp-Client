import Link from "next/link";
import React from "react";

interface TextButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
    text,
    href = "#",
    onClick,
}) => {
    return (
        <Link
            href={href}
            className="text-(--secondary-text-color) transition duration-100 hover:-translate-y-[1px] hover:scale-105 hover:text-(--text-color) active:-translate-y-0 active:scale-100 active:opacity-50"
            onClick={onClick}
        >
            {text}
        </Link>
    );
};

export default TextButton;
