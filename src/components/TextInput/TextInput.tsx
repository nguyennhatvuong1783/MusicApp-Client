import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Warning } from "../icons/Icons";

interface TextInputProps {
    label?: string;
    placeholder?: string;
    isPassword?: boolean;
    register?: UseFormRegisterReturn;
    error?: string;
    isDisabled?: boolean;
    value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    label = "Label",
    placeholder = "",
    isPassword = false,
    register,
    error,
    isDisabled = false,
    value = "",
}) => {
    return (
        <div className="flex flex-col items-start justify-center gap-2">
            <label className="text-sm font-bold">{label}</label>
            <input
                type={isPassword ? "password" : "text"}
                placeholder={placeholder}
                {...register}
                className={`self-stretch rounded-[3px] p-3 inset-ring-1 transition-all duration-200 outline-none focus-within:!inset-ring-3 ${error ? "inset-ring-red-500 focus-within:!inset-ring-red-500 hover:inset-ring-red-500" : "inset-ring-(--secondary-text-color) focus-within:!inset-ring-(--text-color) hover:inset-ring-(--text-color)"} ${isDisabled && "cursor-not-allowed"}`}
                disabled={isDisabled}
                {...(isDisabled ? { value: value } : {})}
            />
            {error && (
                <span className="flex items-start text-sm font-medium text-red-300">
                    <Warning className="mr-1 h-5 min-h-5 w-4 min-w-4" />
                    {error}
                </span>
            )}
        </div>
    );
};

export default TextInput;
