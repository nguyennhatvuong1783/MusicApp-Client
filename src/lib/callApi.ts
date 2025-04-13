import { LoginFormData, SignupFormData } from "@/types/auth";
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
