import {
    AuthUser,
    LoginUserDto,
    PasswordChangeDto,
    RegisterUserDto,
    UpdateProfileDto,
} from "@/types/user";

import { fetchData } from "./api";
import { ApiResponse } from "@/types/api";

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

export const editProfile = async (data: UpdateProfileDto) => {
    return await fetchData("users/profile", data, "PATCH");
};

export const changePassword = async (data: PasswordChangeDto) => {
    return await fetchData("users/change-password", data, "POST");
};
