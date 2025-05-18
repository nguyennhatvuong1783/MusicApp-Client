import { getCookie } from "./cookie";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const API_URL = "http://127.0.0.1:8000/api/";

type Method = "POST" | "PATCH" | "DELETE";

export async function fetchData<T>(
    endpoint: string,
    data: unknown | null,
    method: Method,
): Promise<T> {
    const config: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
    };

    // Thêm token vào headers nếu có
    const token = getCookie("token");
    if (token) {
        (config.headers as Record<string, string>).Authorization =
            `Bearer ${token}`;
    }

    if (data && method !== "DELETE") {
        config.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(`${API_URL}${endpoint}`, config);
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const fetcher = <T>(path: string): Promise<T> => {
    const token = getCookie("token");

    // Tạo headers object
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // Thêm Authorization header nếu có token
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${path}`, {
        headers,
    }).then((res) => res.json() as Promise<T>);
};

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai("gpt-4o"),
        messages,
    });

    return result.toDataStreamResponse();
}

export async function suggestSongs(query: string): Promise<string> {
    try {
        const res = await fetch(API_URL + "ai/suggest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: query }),
        });

        if (!res.ok) {
            throw new Error("Failed to fetch song suggestions");
        }

        const data = await res.json();
        return data.result || "";
    } catch (error) {
        console.error("Error in suggestSongs:", error);
        return "Sorry, I could not fetch song suggestions at the moment.";
    }
}
