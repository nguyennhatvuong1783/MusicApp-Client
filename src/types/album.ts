import { Artist } from "./artist";
import { Genre } from "./genre";
import { Song } from "./song";

export interface Album {
    id: number;
    artist_id: number;
    title: string;
    release_date: string | null;
    image_url: string;
    genre_id: number;
    description: string | null;
    created_at: string | Date;
    updated_at: string | Date;
    songs_count: number;
    artist: Artist;
    songs: Song[];
    genre: Genre;
}

export interface CreateAlbumDto {
    artist_id: number;
    title: string;
    release_date?: string | null;
    image_url?: string | null;
    genre_id?: number | null;
    description?: string | null;
}

export interface UpdateAlbumDto {
    artist_id?: number;
    title?: string;
    release_date?: string | null;
    image_url?: string | null;
    genre_id?: number | null;
    description?: string | null;
}
