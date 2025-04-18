import { Song } from "./song";
import { User } from "./user";

export interface Playlist {
    id: number;
    user_id?: number;
    title: string;
    description?: string | null;
    image_url?: string | null;
    created_at?: string | Date;
    updated_at?: string | Date;
    songs?: Song[];
    songs_count?: number;
    isSelected?: boolean;
}

export interface CreatePlaylistDto {
    title: string;
    description?: string | null;
    image_url?: string | null;
}

export interface UpdatePlaylistDto {
    title?: string;
    description?: string | null;
    image_url?: string | null;
}

export interface PlaylistDisplay
    extends Omit<Playlist, "created_at" | "updated_at"> {
    user?: User;
    song_count?: number;
    duration_total?: number;
    formatted_duration?: string;
}
