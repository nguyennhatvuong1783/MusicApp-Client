"use client";
import Image from "next/image";
import React from "react";
import { Next, Play, Previous, Repeat, Shuffle } from "../icons/Icons";

const PlayerBar = () => {
    return (
        <div className="mb-2 grid h-18 grid-cols-3 items-center px-2">
            <div className="flex items-center">
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
            <div>
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
                <div>
                    <div></div>
                    <div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            defaultValue="50"
                            className="h-1 w-full cursor-pointer bg-black"
                        />
                    </div>
                    <div></div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default PlayerBar;
