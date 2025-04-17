export interface Genre {
    id: number;
    name: string;
    description: string | null;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface CreateGenreDto {
    name: string;
    description?: string | null;
}

export interface UpdateGenreDto {
    name?: string;
    description?: string | null;
}
