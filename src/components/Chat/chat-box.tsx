"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { suggestSongs } from "@/lib/api";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!mounted) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Call suggestSongs API
            const songSuggestions = await suggestSongs(input);
            console.log("Song suggestions:", songSuggestions);

            // Add AI response with song suggestions
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: songSuggestions,
                role: "assistant",
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching song suggestions:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content:
                    "Sorry, I encountered an error while fetching song suggestions.",
                role: "assistant",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <Card className="fixed right-24 bottom-24 z-40 flex h-[500px] w-80 flex-col gap-0 border-2 border-(--secondary-color) bg-(--primary-color) p-0 shadow-2xl sm:w-96">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-green-500 to-green-600 py-4">
                <CardTitle className="text-lg">Music Assistant</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(50vh)] flex-grow p-4">
                <CardContent className="pt-0 pb-0">
                    {messages.length === 0 ? (
                        <div className="my-8 text-center text-(--text-color)">
                            <p>Ask me for song suggestions!</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {message.role !== "user" && (
                                    <Avatar className="mr-2 flex h-8 w-8 items-center justify-center bg-indigo-600">
                                        <Music className="h-4 w-4" />
                                    </Avatar>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                        message.role === "user"
                                            ? "bg-green-500"
                                            : "bg-indigo-600"
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">
                                        {message.content}
                                    </p>
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="ml-2 flex h-8 w-8 items-center justify-center bg-green-500">
                                        <span className="text-xs">You</span>
                                    </Avatar>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </CardContent>
            </ScrollArea>
            <CardFooter className="flex border-t-1 p-3">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask for song suggestions..."
                        className="flex-grow text-(--text-color)"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
