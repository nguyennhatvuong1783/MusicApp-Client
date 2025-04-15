"use client";
import { logout, refreshToken } from "@/lib/callApi";
import { deleteCookie, getCookie, getCookieExpires } from "@/lib/cookie";
import { Song } from "@/types/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    handleLogout: () => Promise<void>;
    handleLogin: () => void;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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

    const handleLogin = () => {
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

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
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
