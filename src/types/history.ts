import { Song } from "./song";

export interface History {
    id: number;
    user_id: number;
    song_id: number;
    played_at: string;
    progress: number | null;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface CreateHistoryDto {
    user_id: number;
    song_id: number;
    progress?: number | null;
}

export interface UpdateHistoryProgressDto {
    progress: number;
}

export interface HistoryDisplay
    extends Omit<History, "user_id" | "created_at" | "updated_at"> {
    song: Song;
    formatted_played_at?: string;
    formatted_progress?: string;
}
