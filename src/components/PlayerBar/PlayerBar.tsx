"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    AddIcon,
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
import { usePlayer } from "@/hooks/usePlayer";
import { formatTime } from "@/lib/utils";
import AddSongToPlaylistModel from "../AddSongToPlaylistDModel/AddSongToPlaylistModel";

const PlayerBar = () => {
    const [valuePlayer, setValuePlayer] = useState<number>(0);
    const [valueVolume, setValueVolume] = useState<number>(1);
    const rangePlayer = useRef<HTMLInputElement>(null);
    const rangeVolume = useRef<HTMLInputElement>(null);
    const [currentVolume, setCurrentVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        currentSong,
        isPlaying,
        currentTime,
        togglePlayPause,
        playNext,
        playPrevious,
        seekTo,
    } = usePlayer();

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

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    const handleChangProgressDisplay = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setIsSeeking(true);
        const value = Number(e.target.value);
        setValuePlayer(value);
        if (currentSong) {
            const seekTime = (value * currentSong.duration) / 100;
            setPassedTime(seekTime);
        }
    };

    const handleSeek = (
        e:
            | React.MouseEvent<HTMLInputElement>
            | React.TouchEvent<HTMLInputElement>,
    ) => {
        const target = e.target as HTMLInputElement;
        const value = Number(target.value);
        if (currentSong) {
            const seekTime = (value * currentSong.duration) / 100;
            seekTo(seekTime);
        }
        setIsSeeking(false);
    };

    // Xử lý thanh progress và time tự động chạy bởi nhạc
    const handleTimeUpdate = () => {
        if (audioRef.current && currentSong && !isSeeking) {
            const audioCurrentTime = audioRef.current.currentTime;
            setPassedTime(audioCurrentTime);
            const updateTime = (audioCurrentTime / currentSong.duration) * 100;
            setValuePlayer(updateTime);
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

    return (
        <div className="grid h-18 grid-cols-13 items-center">
            {currentSong && (
                <audio
                    ref={audioRef}
                    src={currentSong.file_url}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={playNext}
                    hidden
                    autoPlay={isPlaying}
                />
            )}
            <div className="col-span-4 flex items-center">
                {currentSong && (
                    <>
                        <Image
                            src={
                                currentSong.album?.image_url ??
                                "https://www.shyamh.com/images/blog/music.jpg"
                            }
                            alt="Image"
                            width={56}
                            height={56}
                            className="mx-2 aspect-square overflow-hidden rounded object-cover"
                        />
                        <div className="flex flex-col justify-center px-[6px]">
                            <span className="text-sm font-medium">
                                {currentSong.title}
                            </span>
                            <span className="text-xs text-(--secondary-text-color)">
                                {currentSong.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                            </span>
                        </div>
                        <div className="ml-4">
                            {showModal && (
                                <AddSongToPlaylistModel
                                    songId={currentSong.id}
                                    onClose={() => setShowModal(false)}
                                />
                            )}
                            <AddIcon
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => setShowModal(!showModal)}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="col-span-5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <Shuffle
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                    />
                    <Previous
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                        onClick={playPrevious}
                    />
                    <button
                        className={`mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-(--text-color) text-(--primary-color) transition duration-100 hover:scale-104 hover:brightness-90 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                        onClick={togglePlayPause}
                    >
                        {!isPlaying ? (
                            <Play className="h-5 w-5" />
                        ) : (
                            <Pause className="h-4 w-4" />
                        )}
                    </button>
                    <Next
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                        onClick={playNext}
                    />
                    <Repeat
                        className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                    />
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-xs font-medium text-(--secondary-text-color)">
                    <span className="cursor-default">
                        {currentSong ? formatTime(passedTime) : "-:--"}
                    </span>
                    <input
                        ref={rangePlayer}
                        type="range"
                        min={0}
                        max={100}
                        step={0.5}
                        value={valuePlayer}
                        className={`slider-player slider relative h-[0.20rem] w-full flex-1 cursor-pointer appearance-none rounded bg-[#4d4d4d] ${!currentSong && "pointer-events-none"}`}
                        onChange={(e) => handleChangProgressDisplay(e)}
                        onTouchEnd={(e) =>
                            handleSeek(e as React.TouchEvent<HTMLInputElement>)
                        }
                        onMouseUp={(e) =>
                            handleSeek(e as React.MouseEvent<HTMLInputElement>)
                        }
                    />
                    <span className="cursor-default">
                        {currentSong
                            ? formatTime(currentSong.duration)
                            : "-:--"}
                    </span>
                </div>
            </div>
            <div className="col-span-4 flex items-center justify-center pl-32">
                <Lyrics
                    className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
                />
                <Queue
                    className={`m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80 ${!currentSong && "pointer-events-none brightness-30"}`}
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
