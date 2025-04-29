"use client";
import ContextHeader from "@/components/ContextHeader/ContextHeader";
import ListSong from "@/components/SongList/SongList";
import { useAuth } from "@/hooks/useAuth";
import { fetcher } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Playlist } from "@/types/playlist";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function PlaylistPage() {
    const params = useParams<{ id: string }>();
    const { id } = params;
    const { user } = useAuth();

    const { data, error, isLoading } = useSWR<ApiResponse<Playlist>>(
        `playlists/${id}`,
        fetcher,
    );

    if (error) return <div>Error when loading playlist</div>;

    return (
        <>
            {!isLoading && data?.data && (
                <>
                    <ContextHeader
                        key={data.data.id}
                        title={data.data.title}
                        artist={user?.username}
                        PriImgUrl={
                            data.data.image_url ||
                            "https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                        }
                        SecImgUrl={
                            data.data.image_url ||
                            "https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                        }
                        totalSongs={data.data.songs_count}
                        totalDuration={(data.data.songs ?? []).reduce(
                            (total, song) => total + song.duration,
                            0,
                        )}
                        type="playlist"
                        contextId={data.data.id}
                        songs={data.data.songs ?? []}
                    />
                    <ListSong
                        contextId={data.data.id}
                        title={data.data.title}
                        type="playlist"
                        songs={data.data.songs}
                    />
                </>
            )}
        </>
    );
}
