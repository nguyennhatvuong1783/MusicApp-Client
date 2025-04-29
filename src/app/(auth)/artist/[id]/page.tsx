"use client";
import ContextHeader from "@/components/ContextHeader/ContextHeader";
import ListSong from "@/components/SongList/SongList";
import { fetcher } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Artist } from "@/types/artist";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function ArtistPage() {
    const params = useParams<{ id: string }>();
    const { id } = params;

    const { data, error, isLoading } = useSWR<ApiResponse<Artist>>(
        `artists/${id}`,
        fetcher,
    );
    if (error) return <div>Error when loading artist</div>;

    return (
        <>
            {!isLoading && data?.data && (
                <>
                    <ContextHeader
                        key={data.data.id}
                        title={data.data.name}
                        PriImgUrl={data.data.image_url}
                        SecImgUrl={data.data.image_url}
                        totalSongs={data.data.songs_count}
                        totalDuration={data.data.songs.reduce(
                            (total, song) => total + song.duration,
                            0,
                        )}
                        type="artist"
                        contextId={data.data.id}
                        songs={data.data.songs}
                    />
                    <ListSong
                        contextId={data.data.id}
                        title={data.data.name}
                        type="artist"
                        songs={data.data.songs}
                    />
                </>
            )}
        </>
    );
}
