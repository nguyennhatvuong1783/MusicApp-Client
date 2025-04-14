"use client";
import React from "react";
import { Search } from "../icons/Icons";

interface TextboxProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Textbox: React.FC<TextboxProps> = ({ onChange, value }) => {
    return (
        <div className="group relative flex w-118.5 rounded-full bg-(--secondary-color) transition duration-500 focus-within:!inset-ring-2 focus-within:!inset-ring-(--text-color) focus-within:brightness-130 hover:inset-ring hover:inset-ring-[#3a3a3a] hover:brightness-130">
            <label htmlFor="search">
                <Search className="h-12 w-12 cursor-pointer px-3 text-(--secondary-text-color) transition duration-500 group-focus-within:text-(--text-color) group-hover:text-(--text-color)" />
            </label>
            <input
                id="search"
                type="search"
                placeholder="What do you want to play?"
                className="w-full bg-transparent py-3 pr-3 placeholder-(--secondary-text-color) outline-none"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default Textbox;
