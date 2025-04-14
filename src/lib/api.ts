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

    const res = await fetch(`${API_URL}${endpoint}`, config);
    let errorData = null;
    if (!res.ok) {
        try {
            const responseText = await res.text();
            try {
                errorData = JSON.parse(responseText); // Thử parse thành JSON
                if (!errorData.errors && !errorData.error) {
                    // Nếu không có thuộc tính errors hay error
                    throw new Error(
                        `Failed to fetch: ${res.status} - ${JSON.stringify(errorData)}`,
                    );
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                // Nếu không parse được JSON (response không phải JSON)
                throw new Error(
                    `Failed to fetch: ${res.status} - ${responseText}`,
                );
            }
        } catch (e) {
            throw new Error(
                `Failed to fetch: ${res.status} - ${e instanceof Error ? e.message : "Unknown error"}`,
            );
        }
    }

    return errorData ?? res.json(); // Trả về dữ liệu nếu không có lỗi
}

export const fetcher = <T>(path: string): Promise<T> =>
    fetch(`${API_URL}${path}`).then((res) => res.json() as Promise<T>);
