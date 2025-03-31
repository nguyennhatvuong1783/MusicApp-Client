import React from "react";

interface TextboxLoginProps {
    text?: string;
    placeholder?: string;
}

const TextboxLogin: React.FC<TextboxLoginProps> = ({
    text = "Label",
    placeholder = "",
}) => {
    return (
        <div className="flex flex-col items-start justify-center gap-2">
            <label htmlFor="username" className="text-sm font-bold">
                {text}
            </label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder={placeholder}
                className="self-stretch rounded-[3px] p-3 inset-ring-1 inset-ring-(--secondary-text-color) transition-all duration-200 outline-none focus-within:!inset-ring-3 focus-within:!inset-ring-(--text-color) hover:inset-ring-(--text-color)"
            />
        </div>
    );
};

export default TextboxLogin;
