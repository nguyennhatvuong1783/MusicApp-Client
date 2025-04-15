"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    Lyrics,
    MaxVolume,
    Mute,
    Next,
    Pause,
    Play,
    Previous,
    Queue,
    Repeat,
    Shuffle,
} from "../icons/Icons";
import { useAuth } from "@/hooks/useAuth";
import useSWR from "swr";
import { ApiResponse, Pagination, Song } from "@/types/auth";
import { fetcher } from "@/lib/api";

const PlayerBar = () => {
    const {
        songs,
        currentSongId,
        isPlaying,
        setIsPlaying,
        setCurrentSongId,
        setSongs,
        artistSongsId,
        albumSongsId,
        imageUrl,
    } = useAuth();
    const [valuePlayer, setValuePlayer] = useState<number>(0);
    const [valueVolume, setValueVolume] = useState<number>(1);
    const rangePlayer = useRef<HTMLInputElement>(null);
    const rangeVolume = useRef<HTMLInputElement>(null);
    const [currentVolume, setCurrentVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const { data, error, isLoading } = useSWR<ApiResponse<Pagination<Song>>>(
        `songs`,
        fetcher,
    );

    // Xử lý next
    const handleNext = () => {
        if (currentSongId && songs) {
            if (artistSongsId) {
                if (currentSongId === artistSongsId[artistSongsId.length - 1]) {
                    setCurrentSongId(artistSongsId[0]);
                    return;
                }
                const currentIndex = artistSongsId.indexOf(currentSongId);
                const nextId = artistSongsId[currentIndex + 1];
                setCurrentSongId(nextId);
                return;
            }

            if (albumSongsId) {
                if (currentSongId === albumSongsId[albumSongsId.length - 1]) {
                    setCurrentSongId(albumSongsId[0]);
                    return;
                }
                const currentIndex = albumSongsId.indexOf(currentSongId);
                const nextId = albumSongsId[currentIndex + 1];
                setCurrentSongId(nextId);
                return;
            }

            if (currentSongId >= songs[songs.length - 1].id) {
                setCurrentSongId(songs[0].id);
                return;
            }
            const nextId = currentSongId + 1;
            setCurrentSongId(nextId);
        }
    };

    // Xử lý previous
    const handlePrevious = () => {
        if (currentSongId && songs) {
            if (valuePlayer > 2 && audioRef.current) {
                audioRef.current.currentTime = 0;
                return;
            }
            if (artistSongsId) {
                if (currentSongId === artistSongsId[0]) {
                    setCurrentSongId(artistSongsId[artistSongsId.length - 1]);
                    return;
                }
                const currentIndex = artistSongsId.indexOf(currentSongId);
                const nextId = artistSongsId[currentIndex - 1];
                setCurrentSongId(nextId);
                return;
            }

            if (albumSongsId) {
                if (currentSongId === albumSongsId[0]) {
                    setCurrentSongId(albumSongsId[albumSongsId.length - 1]);
                    return;
                }
                const currentIndex = albumSongsId.indexOf(currentSongId);
                const nextId = albumSongsId[currentIndex - 1];
                setCurrentSongId(nextId);
                return;
            }
            if (currentSongId <= songs[0].id) {
                setCurrentSongId(songs[songs.length - 1].id);
                return;
            }
            const nextId = currentSongId - 1;
            setCurrentSongId(nextId);
        }
    };

    // Xử lý on/off mute khi bấm vào volume icon
    const handleMute = () => {
        if (valueVolume > 0) {
            setValueVolume(0);
        } else {
            if (currentVolume === 0) {
                setValueVolume(1);
            } else {
                setValueVolume(currentVolume);
            }
        }
    };

    // Xử lý tăng/giảm volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : valueVolume;
        }
    }, [valueVolume, isMuted, audioRef]);

    // Xử lý thanh progress và time tự động chạy bởi nhạc
    const handleTimeUpdate = () => {
        if (audioRef.current && songs && !isSeeking) {
            const currentTime = audioRef.current.currentTime;
            const duration =
                songs.find((song) => song.id === currentSongId)?.duration ?? 0;
            setValuePlayer((currentTime / duration) * 100);
            setPassedTime(currentTime);
        }
    };

    // Định dạng thời gian theo giây
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };

    // Xử lý khi ấn play/pause
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Xử lý play/pause nhạc
    useEffect(() => {
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current
                    .play()
                    .then(() => console.log("Playing audio"))
                    .catch((err) => console.error("Error playing audio:", err));
            }
        }
    }, [isPlaying]);

    // Xử lý khi bấm qua bài khác
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    }, [currentSongId, setIsPlaying, audioRef]);

    // Xử lý tua nhang khi kéo thanh progress
    const handleSeek = () => {
        if (audioRef.current && songs) {
            const duration =
                songs.find((song) => song.id === currentSongId)?.duration ?? 0;
            const seekTime = (valuePlayer / 100) * duration;
            audioRef.current.currentTime = seekTime;
        }
        setIsSeeking(false);
    };

    const handleSeekPassedTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setValuePlayer(value);
        if (audioRef.current && songs) {
            const duration =
                songs.find((song) => song.id === currentSongId)?.duration ?? 0;
            const seekTime = (valuePlayer / 100) * duration;
            setPassedTime(seekTime);
        }
    };

    // Xử lý range progress và on/off mute khi kéo volume
    useEffect(() => {
        if (rangePlayer.current) {
            rangePlayer.current.style.setProperty(
                "--progress",
                `${valuePlayer}%`,
            );
        }
        if (rangeVolume.current) {
            rangeVolume.current.style.setProperty(
                "--progress",
                `${valueVolume}`,
            );
        }
        if (valueVolume > 0) {
            setIsMuted(false);
        } else {
            setIsMuted(true);
        }
    }, [valuePlayer, valueVolume]);

    useEffect(() => {
        if (!isLoading) setSongs(data?.data.data ?? []);
    }, [setSongs, data?.data.data, isLoading]);

    if (error) return <div>Error when loading songs</div>;

    return (
        <div className="mb-2 grid h-18 grid-cols-13 items-center px-2">
            {songs && currentSongId && (
                <audio
                    ref={audioRef}
                    src={
                        songs.find((song) => song.id === currentSongId)
                            ?.file_url
                    }
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleNext}
                    hidden
                />
            )}
            <div className="col-span-4 flex items-center">
                {songs && currentSongId && (
                    <>
                        <Image
                            src={imageUrl}
                            alt="Image"
                            width={56}
                            height={56}
                            className="mx-2 aspect-square overflow-hidden rounded object-cover"
                        />
                        <div className="flex flex-col justify-center px-[6px]">
                            <span className="text-sm font-medium">
                                {
                                    songs.find(
                                        (song) => song.id === currentSongId,
                                    )?.title
                                }
                            </span>
                            <span className="text-xs text-(--secondary-text-color)">
                                {songs
                                    .find((song) => song.id === currentSongId)
                                    ?.artists.map((artist) => artist.name)
                                    .join(", ")}
                            </span>
                        </div>
                    </>
                )}
            </div>
            <div className="col-span-5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <Shuffle
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                    />
                    <Previous
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                        onClick={handlePrevious}
                    />
                    <button
                        className={`mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-(--text-color) text-(--primary-color) transition duration-100 hover:scale-104 hover:brightness-90 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                        onClick={handlePlayPause}
                    >
                        {!isPlaying ? (
                            <Play className="h-5 w-5" />
                        ) : (
                            <Pause className="h-4 w-4" />
                        )}
                    </button>
                    <Next
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                        onClick={handleNext}
                    />
                    <Repeat
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                    />
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-xs font-medium text-(--secondary-text-color)">
                    <span className="cursor-default">
                        {songs && currentSongId
                            ? formatTime(passedTime)
                            : "-:--"}
                    </span>
                    <input
                        ref={rangePlayer}
                        type="range"
                        min={0}
                        max={100}
                        step={0.5}
                        value={valuePlayer}
                        className={`slider-player slider relative h-[0.20rem] w-full flex-1 cursor-pointer appearance-none rounded bg-[#4d4d4d] ${!songs || (!currentSongId && "pointer-events-none")}`}
                        onChange={(e) => handleSeekPassedTime(e)}
                        onMouseDown={() => setIsSeeking(true)}
                        onTouchStart={() => setIsSeeking(true)}
                        onMouseUp={handleSeek}
                        onTouchEnd={handleSeek}
                    />
                    <span className="cursor-default">
                        {songs && currentSongId
                            ? formatTime(
                                  songs.find(
                                      (songs) => songs.id === currentSongId,
                                  )?.duration ?? 0,
                              )
                            : "-:--"}
                    </span>
                </div>
            </div>
            <div className="col-span-4 flex items-center justify-center pl-32">
                <Lyrics
                    className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                />
                <Queue
                    className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!songs || (!currentSongId && "pointer-events-none brightness-30")}`}
                />
                {isMuted ? (
                    <Mute
                        className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:brightness-150 active:brightness-80"
                        onClick={handleMute}
                    />
                ) : (
                    <MaxVolume
                        className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:brightness-150 active:brightness-80"
                        onClick={handleMute}
                    />
                )}
                <input
                    ref={rangeVolume}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={valueVolume}
                    className="slider-volume slider relative h-[0.20rem] w-24 cursor-pointer appearance-none rounded bg-[#4d4d4d]"
                    onChange={(e) => {
                        setValueVolume(Number(e.target.value));
                        setCurrentVolume(Number(e.target.value));
                    }}
                />
            </div>
        </div>
    );
};

export default PlayerBar;
