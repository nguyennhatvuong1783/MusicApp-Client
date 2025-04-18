import React from "react";
import Button from "../Buttons/Button";
import { useAuth } from "@/hooks/useAuth";
import { mutate } from "swr";
import { createPlaylist } from "@/lib/callApi";
import { CreatePlaylistDto } from "@/types/playlist";

interface SubLibraryProps {
    title?: string;
    subTitle?: string;
    textBtn?: string;
}

const SubLibrary: React.FC<SubLibraryProps> = ({
    title = "Title",
    subTitle = "Sub Title",
    textBtn = "Button",
}) => {
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
        <div className="my-6 flex flex-col justify-center gap-5 rounded-md bg-(--secondary-color) px-5 py-4">
            <div className="flex flex-col justify-center gap-2">
                <span className="font-bold">{title}</span>
                <span className="text-sm">{subTitle}</span>
            </div>
            <Button
                className="h-8 self-start px-4 py-1 text-sm font-bold"
                text={textBtn}
                href={!user ? "/login" : "#"}
                onClick={handleCreatePlaylist}
            />
        </div>
    );
};

export default SubLibrary;
