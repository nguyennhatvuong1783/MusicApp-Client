"use client";
import React from "react";
import { Play } from "../icons/Icons";

interface ButtonPlayProps {
    className?: string;
}

const ButtonPlay: React.FC<ButtonPlayProps> = ({ className = "" }) => {
    return (
        <button
            className={`z-10 cursor-pointer rounded-full bg-(--green-color) p-3 text-(--primary-color) transition duration-300 hover:scale-104 hover:brightness-105 active:scale-100 active:brightness-80 ${className}`}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Play className="h-6 w-6" />
        </button>
    );
};

export default ButtonPlay;
