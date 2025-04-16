"use client";
import { fetcher } from "@/lib/api";
import { logout, refreshToken } from "@/lib/callApi";
import { deleteCookie, getCookie, getCookieExpires } from "@/lib/cookie";
import { ApiResponse, Song, User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
    handleLogout: () => Promise<void>;
    handleLogin: (user: User) => void;
    songs: Song[] | null;
    setSongs: React.Dispatch<React.SetStateAction<Song[] | null>>;
    currentSongId: number | null;
    setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    artistSongsId: number[] | null;
    setArtistSongsId: React.Dispatch<React.SetStateAction<number[] | null>>;
    albumSongsId: number[] | null;
    setAlbumSongsId: React.Dispatch<React.SetStateAction<number[] | null>>;
    // playlistSongsId: number[] | null;
    // setPlaylistSongsId: React.Dispatch<React.SetStateAction<number[] | null>>;
    imageUrl: string;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const route = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [songs, setSongs] = useState<Song[] | null>(null);
    const [currentSongId, setCurrentSongId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [artistSongsId, setArtistSongsId] = useState<number[] | null>(null);
    const [albumSongsId, setAlbumSongsId] = useState<number[] | null>(null);
    // const [playlistSongsId, setPlaylistSongsId] = useState<number[] | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(
        "https://www.shyamh.com/images/blog/music.jpg",
    );

    const {
        data,
        error,
        isLoading: isSwrLoading,
    } = useSWR<ApiResponse<User>>(`auth/me`, fetcher);

    const handleLogin = (user: User) => {
        setUser(user);
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
        setUser(null);
        setIsLoading(false);
        route.push("/");
    };

    const checkAuth = async () => {
        // Kiểm tra xem cookie có tồn tại hay không
        const token = getCookie("token");
        if (token) {
            // Kiểm tra thời gian hết hạn của cookie
            const expires = getCookieExpires("token");
            // Nếu cookie đã hết hạn, xóa cookie và localStorage
            if (expires && expires < 0) {
                deleteCookie("token");
                localStorage.removeItem("myCookieExpires");
                setUser(null);
                setIsLoading(false);
                return;
            }
            // Nếu cookie còn hiệu lực nhưng thời gian còn lại dưới 5 phút, refresh token
            if (expires && expires < 300000) {
                console.log("Token is about to expire, refreshing...");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user: any = await refreshToken();
                if (user.errors) {
                    console.error("Refresh token failed:", user.errors);
                    return;
                }
                // Xóa cookie token
                deleteCookie("token");
                localStorage.removeItem("myCookieExpires");
                // Lưu token mới vào cookie
                const expires = Date.now() + 3600 * 1000; // 1 tiếng
                document.cookie = `token=${user.data.access_token}; path=/; max-age=3600`;
                localStorage.setItem("myCookieExpires", expires.toString());
                setUser(user.data.user);
                return;
            }
            // Nếu cookie còn hiệu lực, lấy thông tin người dùng
            if (error) {
                console.error("Error fetching user data:", error);
            }
            setUser(data?.data as User);
        } else {
            setUser(null);
        }
        if (!isSwrLoading) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                handleLogout,
                handleLogin,
                songs,
                setSongs,
                currentSongId,
                setCurrentSongId,
                isPlaying,
                setIsPlaying,
                artistSongsId,
                setArtistSongsId,
                albumSongsId,
                setAlbumSongsId,
                // playlistSongsId,
                // setPlaylistSongsId,
                imageUrl,
                setImageUrl,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
