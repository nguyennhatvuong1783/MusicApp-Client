import { Album } from "./album";
import { Song } from "./song";

export interface Artist {
    id: number;
    user_id: number | null;
    is_verified: boolean;
    name: string;
    biography: string | null;
    image_url: string;
    created_at: string | Date;
    updated_at: string | Date;
    songs_count: number;
    albums_count: number;
    songs: Song[];
    albums: Album[];
}

export interface CreateArtistDto {
    name: string;
    biography?: string | null;
    image_url?: string | null;
}

export interface UpdateArtistDto {
    name?: string;
    biography?: string | null;
    image_url?: string | null;
}

export interface ArtistDisplay
    extends Omit<Artist, "created_at" | "updated_at"> {
    formattedDate?: string;
}
