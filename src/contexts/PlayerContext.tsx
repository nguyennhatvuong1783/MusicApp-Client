"use client";
import { Song } from "@/types/song";
import { createContext, useCallback, useState } from "react";

type PlayMode = "song" | "album" | "playlist" | "artist";
type RepeatMode = "none" | "all" | "one";

type PlayerContextType = {
    // State
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    shuffleQueue: Song[];
    currentIndex: number;
    playMode: PlayMode;
    repeatMode: RepeatMode;
    isShuffled: boolean;
    currentTime: number;
    currentContext: {
        // Thông tin context hiện tại (album/playlist/artist)
        id?: number;
        type?: PlayMode;
        name?: string;
    };

    // Actions
    playSong: (song: Song) => void;
    playPlaylist: (
        playlist: {
            id: number;
            name: string;
            playMode: PlayMode;
            songs: Song[];
        },
        startFrom?: number,
    ) => void;
    togglePlayPause: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleRepeat: () => void;
    toggleShuffle: () => void;
    addToQueue: (songs: Song[]) => void;
    removeFromQueue: (song: Song) => void;
    clearQueue: () => void;
    seekTo: (time: number) => void;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [queue, setQueue] = useState<Song[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [shuffleQueue, setShuffleQueue] = useState<Song[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [playMode, setPlayMode] = useState<PlayMode>("song");
    const [repeatMode, setRepeatMode] = useState<RepeatMode>("none");
    const [isShuffled, setIsShuffled] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentContext, setCurrentContext] = useState<{
        id?: number;
        type?: PlayMode;
        name?: string;
    }>({});

    const currentSong = currentIndex >= 0 ? queue[currentIndex] : null;

    // Phát một bài hát đơn
    const playSong = useCallback((song: Song) => {
        setQueue([song]);
        setCurrentIndex(0);
        setPlayMode("song");
        setCurrentContext({});
        setIsPlaying(true);
    }, []);

    // Phát một playlist
    const playPlaylist = useCallback(
        (
            playlist: {
                id: number;
                name: string;
                playMode: PlayMode;
                songs: Song[];
            },
            startFrom = 0,
        ) => {
            setQueue(playlist.songs);
            setCurrentIndex(startFrom);
            setPlayMode(playlist.playMode);
            setCurrentContext({
                id: playlist.id,
                type: playlist.playMode,
                name: playlist.name,
            });
            setIsPlaying(true);
        },
        [],
    );

    // Thêm bài hát vào queue (phát sau bài hiện tại)
    const addToQueue = useCallback((songs: Song[]) => {
        setQueue((prev) => {
            // Nếu queue rỗng, phát luôn bài đầu tiên
            if (prev.length === 0 && songs.length > 0) {
                setCurrentIndex(0);
                setIsPlaying(true);
            }
            return [...prev, ...songs];
        });
    }, []);

    const removeFromQueue = useCallback(
        (song: Song) => {
            setQueue((prev) => {
                const newQueue = prev.filter((s) => s.id !== song.id);
                // Nếu bài hát hiện tại bị xóa, cập nhật lại currentIndex
                if (currentSong?.id === song.id) {
                    setCurrentIndex((prevIndex) =>
                        prevIndex >= newQueue.length
                            ? newQueue.length - 1
                            : prevIndex,
                    );
                }
                return newQueue;
            });
        },
        [currentSong],
    );

    // Xóa toàn bộ queue
    const clearQueue = useCallback(() => {
        setQueue([]);
        setCurrentIndex(-1);
        setIsPlaying(false);
        setCurrentContext({});
    }, []);

    // Play/Pause
    const togglePlayPause = useCallback(() => {
        setIsPlaying((prev) => {
            // Nếu không có bài hát nào thì không làm gì
            if (queue.length === 0) return false;
            return !prev;
        });
    }, [queue]);

    // Bài tiếp theo (xử lý khác nhau tùy chế độ phát)
    const playNext = useCallback(() => {
        if (!isPlaying) setIsPlaying(true);
        setCurrentIndex((prev) => {
            // Nếu đang ở chế độ repeat một bài
            if (repeatMode === "one") return prev;

            // Nếu còn bài tiếp theo trong queue
            if (prev < queue.length - 1) return prev + 1;

            // Nếu hết queue
            if (repeatMode === "all" || playMode === "song") {
                // Lặp lại từ đầu
                return 0;
            } else {
                // Dừng phát
                setIsPlaying(false);
                return prev;
            }
        });
    }, [repeatMode, queue, playMode, isPlaying]);

    // Bài trước đó
    const playPrevious = useCallback(() => {
        if (!isPlaying) setIsPlaying(true);
        setCurrentIndex((prev) => {
            // Nếu đang ở đầu queue và chế độ lặp tất cả
            if ((prev <= 0 && repeatMode === "all") || playMode === "song") {
                return queue.length - 1;
            }
            // Nếu không phải bài đầu tiên
            if (prev > 0) return prev - 1;
            // Mặc định trở về đầu
            return 0;
        });
    }, [repeatMode, queue, playMode, isPlaying]);

    // Seek đến thời gian cụ thể
    const seekTo = useCallback((time: number) => {
        setCurrentTime(time);
    }, []);

    // Bật/tắt shuffle
    const toggleShuffle = useCallback(() => {
        if (isShuffled) {
            // Nếu đang shuffle -> trở về queue gốc
            setQueue(shuffleQueue);
            // Tìm lại vị trí bài hát hiện tại trong queue gốc
            if (currentSong) {
                const newIndex = shuffleQueue.findIndex(
                    (song) => song.id === currentSong.id,
                );
                setCurrentIndex(newIndex >= 0 ? newIndex : 0);
            }
        } else {
            // Nếu chưa shuffle -> tạo queue mới xáo trộn
            const shuffledQueue = [...queue];
            // Xáo trộn Fisher-Yates algorithm
            for (let i = shuffledQueue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledQueue[i], shuffledQueue[j]] = [
                    shuffledQueue[j],
                    shuffledQueue[i],
                ];
            }
            setQueue(shuffledQueue);
            // Giữ nguyên bài hát hiện tại ở đầu queue
            if (currentSong) {
                const currentSongIndex = shuffledQueue.findIndex(
                    (song) => song.id === currentSong.id,
                );
                if (currentSongIndex > 0) {
                    [shuffledQueue[0], shuffledQueue[currentSongIndex]] = [
                        shuffledQueue[currentSongIndex],
                        shuffledQueue[0],
                    ];
                }
                setCurrentIndex(0);
            }
        }
        setIsShuffled(!isShuffled);
    }, [isShuffled, queue, shuffleQueue, currentSong]);

    // Chuyển đổi chế độ repeat
    const toggleRepeat = useCallback(() => {
        setRepeatMode((prev) => {
            switch (prev) {
                case "none":
                    return "one";
                case "one":
                    return "all";
                case "all":
                    return "none";
                default:
                    return "none";
            }
        });
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                // State
                currentSong,
                isPlaying,
                queue,
                shuffleQueue: shuffleQueue,
                currentIndex,
                playMode,
                repeatMode,
                isShuffled,
                currentTime,
                currentContext,

                // Actions
                playSong,
                playPlaylist,
                togglePlayPause,
                playNext,
                playPrevious,
                addToQueue,
                clearQueue,
                seekTo,
                toggleRepeat,
                toggleShuffle,
                removeFromQueue,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
