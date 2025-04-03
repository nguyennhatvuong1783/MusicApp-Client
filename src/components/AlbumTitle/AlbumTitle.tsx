import Image from "next/image";
import ButtonPlay from "../Buttons/ButtonPlay";
import AutoTextSize from "../AutoTextSize/AutoTextSize";

const AlbumTitle = () => {
    return (
        <div className="flex max-w-full flex-col">
            <div className="flex bg-[linear-gradient(#71a0a0,#073b3b)] p-6 shadow-[0px_0px_100px_40px_#073b3b]">
                <div className="mr-6 flex flex-col justify-end">
                    <Image
                        src="https://i.scdn.co/image/ab67616d00001e028bdbdf691a5b791a5afb515b"
                        alt="Image"
                        width={221}
                        height={221}
                        className="aspect-square overflow-hidden rounded-sm object-cover shadow-[0px_0px_40px_rgba(0,0,0,0.4)]"
                    />
                </div>
                <div className="flex flex-1 flex-col justify-end gap-2 truncate">
                    <p className="text-sm font-medium">Album</p>
                    {/* <h1 className="line  text-[clamp(10px,1.9em,6em)] leading-none font-extrabold">
                        BẬT NÓ LÊN
                    </h1> */}
                    <AutoTextSize text="eternal sunshine deluxe: brighter days ahead" />
                    <div className="mt-3 flex items-center gap-1">
                        <Image
                            src="https://i.scdn.co/image/ab6761610000f1784bf18316dd0bd42ea5f9f8ec"
                            alt="Image"
                            width={24}
                            height={24}
                            className="aspect-square overflow-hidden rounded-full object-cover"
                        />
                        <p className="text-sm font-bold">SOOBIN</p>
                        <ul className="ml-4 flex list-disc gap-5 text-sm font-medium text-[#71a0a0] brightness-130">
                            <li className="-indent-[6px]">2024</li>
                            <li className="-indent-[6px]">
                                10 songs, 33 min 27 sec
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <ButtonPlay />
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default AlbumTitle;
