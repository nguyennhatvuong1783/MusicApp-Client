import React from "react";
import { Clock } from "../icons/Icons";

const ListSong = () => {
    return (
        <div className="mb-30 px-4 md:px-6">
            <div className="mb-4 border-b-1 border-[#293030] font-medium text-(--secondary-text-color)">
                <div className="grid h-9 grid-cols-22 items-center gap-4">
                    <span className="text-right text-lg">#</span>
                    <span className="col-span-19 text-sm">Title</span>
                    <Clock className="col-span-2 mx-2 h-4 w-4" />
                </div>
            </div>
            <ul>
                <li>
                    <div
                        className="grid h-14 cursor-pointer grid-cols-22 items-center gap-4 rounded text-sm font-medium text-(--secondary-text-color) focus-within:!bg-[#5a5a5a] hover:bg-[#2a2a2a]"
                        tabIndex={0}
                    >
                        <span className="pr-1 text-right text-lg">1</span>
                        <div className="col-span-19 flex flex-col">
                            <span className="text-base text-(--text-color)">
                                Intro
                            </span>
                            <span>SOOBIN</span>
                        </div>
                        <span className="col-span-2">0:59</span>
                    </div>
                </li>
                <li>
                    <div
                        className="grid h-14 cursor-pointer grid-cols-22 items-center gap-4 rounded text-sm font-medium text-(--secondary-text-color) focus-within:!bg-[#5a5a5a] hover:bg-[#2a2a2a]"
                        tabIndex={0}
                    >
                        <span className="pr-1 text-right text-lg">2</span>
                        <div className="col-span-19 flex flex-col">
                            <span className="text-base text-(--text-color)">
                                Intro
                            </span>
                            <span>SOOBIN</span>
                        </div>
                        <span className="col-span-2">0:59</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListSong;
