"use client";
import React from "react";
import { Play } from "../icons/Icons";

interface PlayButtonProps {
    className?: string;
    onClick?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className = "", onClick }) => {
    return (
        <button
            className={`z-10 cursor-pointer rounded-full bg-(--green-color) p-3 text-(--primary-color) transition duration-300 hover:scale-104 hover:brightness-105 active:scale-100 active:brightness-80 ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            <Play className="h-6 w-6" />
        </button>
    );
};

export default PlayButton;
