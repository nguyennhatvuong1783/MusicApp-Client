"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonPlay from "../Buttons/ButtonPlay";

interface ItemAlbumProps {
    title?: string;
    artist?: string;
    url?: string;
}

const ItemAlbum: React.FC<ItemAlbumProps> = ({
    title = "title",
    artist = "artist",
    url = "#",
}) => {
    const router = useRouter();

    return (
        <div
            className="group z-0 flex cursor-pointer flex-col gap-y-1 rounded-md p-[.8rem] hover:bg-(--secondary-color) active:not-[:has(button:hover,a:hover)]:bg-(--primary-color)"
            onClick={() => router.push(url)}
        >
            <div className="relative">
                <Image
                    src="https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b"
                    alt="Image"
                    width={500}
                    height={500}
                    className="aspect-square overflow-hidden rounded-md object-cover"
                />
                <ButtonPlay className="absolute right-2 bottom-0 opacity-0 shadow-[0px_8px_15px_rgba(0,0,0,0.4)] group-hover:-translate-y-2 group-hover:opacity-100" />
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
                href="#"
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
