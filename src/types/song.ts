import { Album } from "./album";
import { Artist } from "./artist";

export interface Song {
    id: number;
    title: string;
    album_id: number | null;
    duration: number;
    file_url: string;
    release_date: string | null;
    created_at: string | Date;
    updated_at: string | Date;
    artists: Artist[];
    album?: Album | null;
}

export interface CreateSongDto {
    title: string;
    album_id?: number | null;
    duration: number;
    file_url: string;
    release_date?: string | null;
}

export interface UpdateSongDto {
    title?: string;
    album_id?: number | null;
    duration?: number;
    file_url?: string;
    release_date?: string | null;
}

export interface SongDisplay extends Omit<Song, "created_at" | "updated_at"> {
    album?: Album | null;
    formatted_duration?: string;
    formatted_release_date?: string;
}
