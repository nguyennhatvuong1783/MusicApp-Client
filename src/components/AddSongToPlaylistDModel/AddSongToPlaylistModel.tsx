"use client";
import { useEffect, useState } from "react";
import { Check, Plus, Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import useSWR from "swr";
import { ApiResponse, Pagination } from "@/types/api";
import { fetcher } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Playlist } from "@/types/playlist";
import Button from "../Buttons/Button";
import { addSongToPlaylist } from "@/lib/callApi";

interface AddSongToPlaylistModelProps {
    songId: number;
    onClose: () => void;
}

const AddSongToPlaylistModel: React.FC<AddSongToPlaylistModelProps> = ({
    songId,
    onClose,
}) => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    const { data, error, isLoading } = useSWR<
        ApiResponse<Pagination<Playlist>>
    >(user ? `playlists` : null, fetcher);

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const handleAddToPlaylist = async () => {
        const requestData = {
            song_ids: [songId],
        };

        const selectedPlaylistIds = playlists
            .filter((playlist) => playlist.isSelected)
            .map((playlist) => playlist.id);

        if (selectedPlaylistIds.length === 0) {
            onClose();
            return;
        }

        selectedPlaylistIds.forEach(async (playlistId) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const responseData = await addSongToPlaylist(
                requestData,
                playlistId,
            );
        });
        onClose();
    };

    const toggleSelection = (id: number) => {
        setPlaylists(
            playlists.map((playlist) =>
                playlist.id === id
                    ? { ...playlist, isSelected: !playlist.isSelected }
                    : playlist,
            ),
        );
    };

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    useEffect(() => {
        if (data?.data?.data) {
            // Map API playlists and add isSelected property
            const apiPlaylists = data.data.data.map((playlist) => ({
                id: playlist.id,
                title: playlist.title,
                isSelected: false,
            }));

            // Combine playlist
            setPlaylists([...apiPlaylists]);
        }
    }, [data]);

    if (error) console.error("Error fetching playlists:", error);

    return (
        <div className="fixed bottom-18 left-54 z-50 flex items-center justify-center overflow-hidden rounded-md bg-(--secondary-color)">
            <div className="w-80 bg-(--secondary-color)">
                <div className="p-4">
                    <h2 className="mb-4 text-lg font-medium">
                        Add to playlist
                    </h2>

                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a playlist"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-md bg-[#2a2a2a] py-2.5 pr-3 pl-9 text-sm focus:outline-none"
                        />
                    </div>

                    <div className="my-3 h-px bg-[#2a2a2a]" />

                    <ScrollArea className="h-[calc(100vh-500px)] space-y-2 pr-2">
                        {!isLoading &&
                            filteredPlaylists.map((playlist) => (
                                <div
                                    key={playlist.id}
                                    onClick={() => toggleSelection(playlist.id)}
                                    className="flex cursor-pointer items-center justify-between rounded-md px-1 py-2 transition-colors hover:bg-[#2a2a2a]"
                                >
                                    <div className="flex items-center gap-3 pl-1">
                                        <Image
                                            src={
                                                playlist.image_url ||
                                                "https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                                            }
                                            alt="Image"
                                            width={32}
                                            height={32}
                                            className="flex h-8 w-8 rounded object-cover"
                                        />
                                        <span>{playlist.title}</span>
                                    </div>

                                    {playlist.isSelected && (
                                        <div className="flex items-center gap-1">
                                            <div className="flex h-5 w-5 items-center justify-center text-green-500">
                                                <Plus className="h-4 w-4 rotate-45" />
                                            </div>
                                            <div className="flex h-5 w-5 items-center justify-center text-green-500">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        </div>
                                    )}

                                    {!playlist.isSelected && (
                                        <div className="h-5 w-5 rounded-full border border-gray-600" />
                                    )}
                                </div>
                            ))}

                        {filteredPlaylists.length === 0 && searchQuery && (
                            <div className="py-4 text-center text-sm text-gray-400">
                                {`No playlists found matching "${searchQuery}"`}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <div className="flex justify-end px-4 pb-4">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 text-sm font-medium transition-colors hover:text-gray-300"
                    >
                        Cancel
                    </button>
                    <Button
                        className="mr-2 px-4 py-1.5 text-sm font-bold"
                        text="Done"
                        onClick={handleAddToPlaylist}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddSongToPlaylistModel;
