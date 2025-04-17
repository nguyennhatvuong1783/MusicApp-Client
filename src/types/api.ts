export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: {
        [key: string]: string;
    };
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: [
        {
            url: string | null;
            label: string;
            active: boolean;
        } | null,
    ];
    next_page_url: string | null;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}
