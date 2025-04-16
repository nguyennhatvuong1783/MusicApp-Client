"use client";
import { useEffect, useState } from "react";

interface SuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    autoCloseDelay?: number; // Thời gian tự động ẩn (ms), mặc định 3000ms (3 giây)
}

export const SuccessDialog = ({
    isOpen,
    onClose,
    message,
    autoCloseDelay = 3000,
}: SuccessDialogProps) => {
    const [isVisible, setIsVisible] = useState(false);
    // Tự động đóng sau khoảng thời gian
    useEffect(() => {
        if (!isOpen) return;

        setIsVisible(true);
        const timerVisible = setTimeout(() => {
            setIsVisible(false);
        }, autoCloseDelay - 200);
        const timer = setTimeout(() => {
            onClose();
        }, autoCloseDelay);

        return () => {
            clearTimeout(timer);
            clearTimeout(timerVisible);
        };
    }, [isOpen, onClose, autoCloseDelay]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    if (!isOpen) return null;

    return (
        <div
            className="bg-opacity-50 fixed inset-0 z-50 flex justify-center"
            onClick={handleClose}
        >
            <div
                className={`h-fit w-full max-w-md rounded-lg bg-white p-6 ${isVisible ? "translate-y-4 opacity-100" : "-translate-y-1 opacity-0"} transition-all duration-300`}
            >
                <div className="flex flex-col items-center">
                    {/* Icon thành công */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        Success!
                    </h3>
                    <p className="text-center text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
};
