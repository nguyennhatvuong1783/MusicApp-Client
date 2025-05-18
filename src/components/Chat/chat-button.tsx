"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function ChatButton({ isOpen, onClick }: ChatButtonProps) {
    return (
        <Button
            onClick={onClick}
            className="fixed right-6 bottom-24 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all duration-300 hover:from-green-600 hover:to-green-700"
            aria-label={isOpen ? "Close chat" : "Open chat"}
        >
            {isOpen ? (
                <X className="h-6 w-6 text-white" />
            ) : (
                <MessageCircle className="h-6 w-6 text-white" />
            )}
        </Button>
    );
}
