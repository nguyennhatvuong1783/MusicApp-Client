import { getCookie } from "./cookie";

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
