"use client";
import { login, logout, refreshToken } from "@/lib/callApi";
import { deleteCookie, getCookie, getCookieExpires } from "@/lib/cookie";
import { LoginFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    handleLogout: () => Promise<void>;
    handleLogin: (loginData: LoginFormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const route = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLogin = async (loginData: LoginFormData) => {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await login(loginData);
        const expires = Date.now() + 3600 * 1000; // 1 tiếng
        document.cookie = `token=${user.data.access_token}; path=/; max-age=3600`;
        localStorage.setItem("myCookieExpires", expires.toString());
        setIsAuthenticated(true);
        setIsLoading(false);
        route.push("/");
    };

    const handleLogout = async () => {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await logout();
        if (user.errors) {
            console.error("Logout failed:", user.errors);
            return;
        }
        // Xóa cookie token
        deleteCookie("token");
        localStorage.removeItem("myCookieExpires");
        setIsAuthenticated(false);
        setIsLoading(false);
        route.push("/");
    };

    useEffect(() => {
        const checkAuth = async () => {
            // Kiểm tra xem cookie có tồn tại hay không
            const token = getCookie("token");
            if (token) {
                // Kiểm tra thời gian hết hạn của cookie
                const expires = getCookieExpires("token");
                console.log("expires", expires);
                if (expires && expires < 0) {
                    deleteCookie("token");
                    localStorage.removeItem("myCookieExpires");
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }
                // Nếu cookie còn hiệu lực nhưng thời gian còn lại dưới 5 phút, refresh token
                if (expires && expires < 300000) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const user: any = await refreshToken();
                    if (user.errors) {
                        console.error("Logout failed:", user.errors);
                        return;
                    }
                    // Xóa cookie token
                    deleteCookie("token");
                    localStorage.removeItem("myCookieExpires");
                    // Lưu token mới vào cookie
                    const expires = Date.now() + 3600 * 1000; // 1 tiếng
                    document.cookie = `token=${user.data.access_token}; path=/; max-age=3600`;
                    localStorage.setItem("myCookieExpires", expires.toString());
                }
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, handleLogout, handleLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
