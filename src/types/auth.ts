export interface LoginFormData {
    username?: string;
    email?: string;
    password: string;
}

export interface SignupFormData {
    username: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

export interface Genre {
    id: number;
    name: string;
    description: string;
}

export interface Artist {
    id: number;
    name: string;
    biography: string;
    image_url: string;
    songs: Song[];
}

export interface Playlist {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    owner: Artist;
    songs: Song[];
}

export interface Song {
    id: number;
    title: string;
    duration: number;
    album_id: number;
    artists: Artist[];
    genre: Genre[];
    playlist: Playlist[];
    file_url: string;
}

export interface Album {
    id: number;
    title: string;
    artist: Artist;
    release_date: string;
    genre: Genre;
    image_url: string;
    songs: Song[];
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
    total: number;
    // per_page, last_page,...
}

export interface ApiResponse<T> {
    status: number;
    data: T;
}
