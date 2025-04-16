import {
    ChangePasswordFormData,
    LoginFormData,
    SignupFormData,
    User,
} from "@/types/auth";
import { fetchData } from "./api";

export const login = async (data: LoginFormData) => {
    return await fetchData("auth/login", data, "POST");
};

export const signup = async (data: SignupFormData) => {
    return await fetchData("auth/register", data, "POST");
};

export const logout = async () => {
    return await fetchData("auth/logout", null, "POST");
};

export const refreshToken = async () => {
    return await fetchData("auth/refresh", null, "POST");
};

export const editProfile = async (data: User) => {
    return await fetchData("users/profile", data, "PATCH");
};

export const changePassword = async (data: ChangePasswordFormData) => {
    return await fetchData("users/change-password", data, "POST");
};
