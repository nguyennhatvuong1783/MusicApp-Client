"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PlayButton from "../Buttons/PlayButton";
import { Song } from "@/types/song";
import { usePlayer } from "@/hooks/usePlayer";
import { useAuth } from "@/hooks/useAuth";

interface ContextItemProps {
    title: string;
    artist?: string;
    artistId?: number;
    imgUrl?: string;
    contextId: number;
    songs: Song[];
    type: "song" | "album" | "artist" | "playlist";
}

const ContextItem: React.FC<ContextItemProps> = ({
    title,
    artist = undefined,
    artistId = undefined,
    imgUrl = "https://www.shyamh.com/images/blog/music.jpg",
    contextId,
    songs,
    type = "song",
}) => {
    const router = useRouter();
    const { user } = useAuth();
    const { playSong, playPlaylist } = usePlayer();

    const handleClickDiv = () => {
        if (type === "song") {
            handleClickButtonPlay();
            return;
        }
        const url = `/${type}/${contextId}`;
        router.push(url);
    };

    const handleClickButtonPlay = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (songs.length > 1) {
            playPlaylist(
                {
                    id: contextId,
                    name: title,
                    playMode: type,
                    songs: songs,
                },
                0,
            );
        } else {
            playSong(songs[0]);
        }
    };

    return (
        <div
            className="group z-0 flex cursor-pointer flex-col gap-y-1 rounded-md p-[.8rem] hover:bg-(--secondary-color) active:not-[:has(button:hover,a:hover)]:bg-(--primary-color)"
            onClick={handleClickDiv}
        >
            <div className="relative">
                <Image
                    src={imgUrl}
                    alt="Image"
                    width={500}
                    height={500}
                    className="aspect-square overflow-hidden rounded-md object-cover"
                />
                <PlayButton
                    className="absolute right-2 bottom-0 opacity-0 shadow-[0px_8px_15px_rgba(0,0,0,0.4)] group-hover:-translate-y-2 group-hover:opacity-100"
                    onClick={handleClickButtonPlay}
                />
            </div>

            <p
                className="mt-1 self-start font-bold decoration-[.1rem] hover:underline"
                onClick={handleClickDiv}
            >
                {title}
            </p>
            <Link
                href={`/artist/${artistId}`}
                className={`self-start text-sm text-(--secondary-text-color) hover:underline ${!artist && "pointer-events-none"}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {artist ? artist : "Artist"}
            </Link>
        </div>
    );
};

export default ContextItem;
