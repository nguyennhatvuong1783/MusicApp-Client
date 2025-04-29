"use client";
import ContextHeader from "@/components/ContextHeader/ContextHeader";
import ListSong from "@/components/SongList/SongList";
import { fetcher } from "@/lib/api";
import { Album } from "@/types/album";
import { ApiResponse } from "@/types/api";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function AlbumPage() {
    const params = useParams<{ id: string }>();
    const { id } = params;

    const { data, error, isLoading } = useSWR<ApiResponse<Album>>(
        `albums/${id}`,
        fetcher,
    );

    if (error) return <div>Error when loading album</div>;

    return (
        <>
            {!isLoading && data?.data && (
                <>
                    <ContextHeader
                        key={data.data.id}
                        title={data.data.title}
                        artist={data.data.artist.name}
                        PriImgUrl={data.data.image_url}
                        SecImgUrl={data.data.artist.image_url}
                        totalSongs={data.data.songs_count}
                        totalDuration={data.data.songs.reduce(
                            (total, song) => total + song.duration,
                            0,
                        )}
                        artistId={data.data.artist.id}
                        type="album"
                        contextId={data.data.id}
                        songs={data.data.songs}
                    />
                    <ListSong
                        contextId={data.data.id}
                        title={data.data.title}
                        type="album"
                        songs={data.data.songs}
                    />
                </>
            )}
        </>
    );
}
