import {
    AuthUser,
    LoginUserDto,
    PasswordChangeDto,
    RegisterUserDto,
    UpdateProfileDto,
    User,
} from "@/types/user";

import { fetchData } from "./api";
import { ApiResponse } from "@/types/api";
import { CreatePlaylistDto, Playlist } from "@/types/playlist";

export const login = async (
    data: LoginUserDto,
): Promise<ApiResponse<AuthUser>> => {
    return await fetchData("auth/login", data, "POST");
};

export const signup = async (
    data: RegisterUserDto,
): Promise<ApiResponse<AuthUser>> => {
    return await fetchData("auth/register", data, "POST");
};

export const logout = async (): Promise<ApiResponse<undefined>> => {
    return await fetchData("auth/logout", null, "POST");
};

export const refreshToken = async (): Promise<ApiResponse<AuthUser>> => {
    return await fetchData("auth/refresh", null, "POST");
};

export const editProfile = async (
    data: UpdateProfileDto,
): Promise<ApiResponse<User>> => {
    return await fetchData("users/profile", data, "PATCH");
};

export const changePassword = async (data: PasswordChangeDto) => {
    return await fetchData("users/change-password", data, "POST");
};

export const createPlaylist = async (
    data: CreatePlaylistDto,
): Promise<ApiResponse<Playlist>> => {
    return await fetchData("playlists", data, "POST");
};

export const addSongToPlaylist = async (
    data: { song_ids: number[] },
    playlistId: number,
): Promise<ApiResponse<Playlist>> => {
    return await fetchData(`playlists/${playlistId}/songs`, data, "POST");
};
