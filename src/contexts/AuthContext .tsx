"use client";
import { fetcher } from "@/lib/api";
import { logout, refreshToken } from "@/lib/callApi";
import { deleteCookie, getCookie, getCookieExpires } from "@/lib/cookie";
import { ApiResponse } from "@/types/api";
import { AuthUser, User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

interface AuthContextType {
    isLoading: boolean;
    user: User | null;
    handleLogout: () => Promise<void>;
    handleLogin: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const route = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const { data, error, isLoading } = useSWR<ApiResponse<User>>(
        `auth/me`,
        fetcher,
    );

    const handleLogin = (user: User) => {
        setUser(user);
        route.push("/");
    };

    const handleLogout = async () => {
        const logoutResponseData: ApiResponse<undefined> = await logout();
        if (logoutResponseData.errors) {
            console.error("Logout failed:", logoutResponseData.errors);
            return;
        }
        // Xóa cookie token
        deleteCookie("token");
        setUser(null);
        route.push("/");
    };

    const checkAuth = async () => {
        const token = getCookie("token");

        if (token) {
            // Lấy thời gian hết hạn token từ localStorage
            const expires = getCookieExpires("token");

            // Nếu không tìm thấy hoặc đã hết hạn
            if (!expires || expires < 0) {
                deleteCookie("token");
                setUser(null);
                return;
            }

            // Nếu còn dưới 5 phút thì tự động gọi refresh
            if (expires < 5 * 60 * 1000) {
                const refreshResponseData: ApiResponse<AuthUser> =
                    await refreshToken();

                if (refreshResponseData.errors) {
                    console.error(
                        "Refresh token failed:",
                        refreshResponseData.errors,
                    );
                    deleteCookie("token");
                    setUser(null);
                    return;
                }

                const accessToken = refreshResponseData.data?.access_token;
                const expiresAt = refreshResponseData.data?.expires_at;

                if (accessToken && expiresAt) {
                    const expiresTime = new Date(expiresAt).getTime();
                    const maxAge = Math.floor(
                        (expiresTime - Date.now()) / 1000,
                    );

                    // Lưu lại token và thời gian hết hạn mới
                    document.cookie = `token=${accessToken}; path=/; max-age=${maxAge}`;
                    localStorage.setItem(
                        "myCookieExpires",
                        expiresTime.toString(),
                    );
                }
            }

            // Token hợp lệ, có thể lấy thông tin user ở đây
            if (error) {
                console.error("Error fetching user data:", error);
            }

            setUser(data?.data as User);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    });

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                user,
                handleLogout,
                handleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
