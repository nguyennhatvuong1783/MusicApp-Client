"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Library, Plus } from "../icons/Icons";
import YourLibrary from "../YourLibrary/YourLibrary";
import SubFooter from "../Footer/SubFooter";
import { useAuth } from "@/hooks/useAuth";
import { createPlaylist } from "@/lib/callApi";
import { CreatePlaylistDto } from "@/types/playlist";
import { mutate } from "swr";

const LeftMenu = () => {
    const { user } = useAuth();

    const handleCreatePlaylist = async () => {
        const data: CreatePlaylistDto = {
            title: "My Playlist",
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const responseData = await createPlaylist(data);
        mutate("playlists");
    };

    return (
        <div className="flex h-full flex-col gap-2">
            {/* Library sections */}
            <div className="flex-1 overflow-hidden rounded-md bg-(--main-color)">
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex cursor-pointer items-center gap-2 px-5 pt-4 pb-2 font-bold text-(--secondary-text-color) hover:text-(--text-color)">
                        <Library className="h-6 w-6" />
                        <span className="hidden truncate md:inline">
                            Your Library
                        </span>
                    </div>
                    {user && (
                        <button
                            className="mt-3 mr-5 flex cursor-pointer items-center gap-2 rounded-full bg-(--secondary-color) px-4 py-2 transition-colors hover:brightness-120"
                            onClick={handleCreatePlaylist}
                        >
                            <Plus className="h-4 w-4 text-(--secondary-text-color)" />
                            <span className="text-sm leading-none font-bold">
                                Create
                            </span>
                        </button>
                    )}
                </div>
                <ScrollArea
                    className={`px-2 pb-2 ${!user ? "h-[calc(100vh-350px)]" : "h-[calc(100vh-410px)]"}`}
                >
                    <YourLibrary />
                </ScrollArea>
                <SubFooter />
            </div>
        </div>
    );
};

export default LeftMenu;
