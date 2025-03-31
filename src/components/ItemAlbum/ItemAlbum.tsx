import React from "react";
import { Play } from "../icons/Icons";
import Image from "next/image";
import Link from "next/link";

const ItemAlbum = () => {
    return (
        <div className="group z-0 flex cursor-pointer flex-col gap-y-1 rounded-md p-[.8rem] hover:bg-(--secondary-color) active:not-[:has(button:hover,a:hover)]:bg-(--primary-color)">
            <div className="relative">
                <Image
                    src="https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b"
                    alt="Image"
                    width={500}
                    height={500}
                    className="aspect-square overflow-hidden rounded-md object-cover"
                />
                <button className="absolute right-2 bottom-0 z-10 cursor-pointer rounded-full bg-(--green-color) p-3 text-(--primary-color) opacity-0 shadow-[0px_8px_15px_rgba(0,0,0,0.4)] transition duration-300 group-hover:-translate-y-2 group-hover:opacity-100 hover:scale-104 hover:brightness-105 active:scale-100 active:brightness-80">
                    <Play className="h-6 w-6" />
                </button>
            </div>

            <Link
                href="#"
                className="mt-1 self-start font-bold decoration-[.1rem] hover:underline"
            >
                DANCING IN THE DARK
            </Link>
            <Link
                href="#"
                className="self-start text-sm text-(--secondary-text-color) hover:underline"
            >
                SOOBIN
            </Link>
        </div>
    );
};

export default ItemAlbum;
