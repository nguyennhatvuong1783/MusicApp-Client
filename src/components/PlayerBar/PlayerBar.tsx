"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    Lyrics,
    MaxVolume,
    Next,
    Play,
    Previous,
    Queue,
    Repeat,
    Shuffle,
} from "../icons/Icons";

const PlayerBar = () => {
    const [valuePlayer, setValuePlayer] = useState<number>(0);
    const [valueVolume, setValueVolume] = useState<number>(100);
    const rangePlayer = useRef<HTMLInputElement>(null);
    const rangeVolume = useRef<HTMLInputElement>(null);

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
                `${valueVolume}%`,
            );
        }
    }, [valuePlayer, valueVolume]);

    return (
        <div className="mb-2 grid h-18 grid-cols-13 items-center px-2">
            <div className="col-span-4 flex items-center">
                <Image
                    src="https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b"
                    alt="Image"
                    width={56}
                    height={56}
                    className="mx-2 aspect-square overflow-hidden rounded object-cover"
                />
                <div className="flex flex-col justify-center px-[6px]">
                    <span className="text-sm font-medium">
                        DANCING IN THE DARK
                    </span>
                    <span className="text-xs text-(--secondary-text-color)">
                        SOOBIN
                    </span>
                </div>
            </div>
            <div className="col-span-5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <Shuffle className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                    <Previous className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                    <button
                        className={
                            "mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-(--text-color) text-(--primary-color) transition duration-100 hover:scale-104 hover:brightness-90 active:scale-100 active:brightness-80"
                        }
                    >
                        <Play className="h-4 w-4" />
                    </button>
                    <Next className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                    <Repeat className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-xs font-medium text-(--secondary-text-color)">
                    <span className="cursor-default">0:21</span>
                    <input
                        ref={rangePlayer}
                        type="range"
                        min={0}
                        max={100}
                        defaultValue={valuePlayer}
                        className="slider-player slider relative h-[0.20rem] w-full flex-1 cursor-pointer appearance-none rounded bg-[#4d4d4d]"
                        onChange={(e) => {
                            setValuePlayer(Number(e.target.value));
                        }}
                    />
                    <span className="cursor-default">3:20</span>
                </div>
            </div>
            <div className="col-span-4 flex items-center justify-center pl-32">
                <Lyrics className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                <Queue className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:brightness-150 active:scale-100 active:brightness-80" />
                <MaxVolume className="m-2 h-4 w-4 cursor-pointer text-(--secondary-text-color) hover:brightness-150 active:brightness-80" />
                <input
                    ref={rangeVolume}
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={valueVolume}
                    className="slider-volume slider relative h-[0.20rem] w-24 cursor-pointer appearance-none rounded bg-[#4d4d4d]"
                    onChange={(e) => {
                        setValueVolume(Number(e.target.value));
                    }}
                />
            </div>
        </div>
    );
};

export default PlayerBar;
