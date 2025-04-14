"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonPlay from "../Buttons/ButtonPlay";
import { Song } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

interface ItemAlbumProps {
    title?: string;
    artist?: string;
    imgUrl?: string;
    url?: string;
    artistId?: number;
    isSong?: boolean;
    song?: Song;
    songId?: number[];
}

const ItemAlbum: React.FC<ItemAlbumProps> = ({
    title = "Title",
    artist = "Artist",
    imgUrl = "https://www.shyamh.com/images/blog/music.jpg",
    url = "#",
    artistId = 1,
    isSong = false,
    song,
    songId = [1],
}) => {
    const router = useRouter();
    const {
        setIsPlaying,
        setCurrentSongId,
        setArtistSongsId,
        setAlbumSongsId,
    } = useAuth();

    const handleClickDiv = () => {
        if (isSong) {
            setCurrentSongId(song?.id ?? 0);
            setIsPlaying(true);
            return;
        }
        router.push(url);
    };

    const handleClickButtonPlay = () => {
        if (isSong) {
            setCurrentSongId(song?.id ?? 0);
            setIsPlaying(true);
            return;
        } else if (artist === "Artist") {
            setAlbumSongsId(null);
            setCurrentSongId(songId[0]);
            setArtistSongsId(songId);
            setIsPlaying(true);
        } else {
            setArtistSongsId(null);
            setCurrentSongId(songId[0]);
            setAlbumSongsId(songId);
            setIsPlaying(true);
        }
        router.push(url);
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
                <ButtonPlay
                    className="absolute right-2 bottom-0 opacity-0 shadow-[0px_8px_15px_rgba(0,0,0,0.4)] group-hover:-translate-y-2 group-hover:opacity-100"
                    onClick={handleClickButtonPlay}
                />
            </div>

            <Link
                href={url}
                className="mt-1 self-start font-bold decoration-[.1rem] hover:underline"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {title}
            </Link>
            <Link
                href={`/artist/${artistId}`}
                className="self-start text-sm text-(--secondary-text-color) hover:underline"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {artist}
            </Link>
        </div>
    );
};

export default ItemAlbum;
