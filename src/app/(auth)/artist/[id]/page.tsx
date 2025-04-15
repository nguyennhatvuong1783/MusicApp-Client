"use client";
import AlbumTitle from "@/components/AlbumTitle/AlbumTitle";
import ListSong from "@/components/ListSong/ListSong";
import { fetcher } from "@/lib/api";
import type { ApiResponse, Artist } from "@/types/auth";
import { use } from "react";
import useSWR from "swr";

interface AlbumPageParams {
    id: string;
}

export default function Artist({ params }: { params: AlbumPageParams }) {
    // No error =))
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    // No error =))

    const { data, error, isLoading } = useSWR<ApiResponse<Artist>>(
        `artists/${id}`,
        fetcher,
    );
    if (error) return <div>Error when loading artist</div>;

    return (
        <>
            {!isLoading && (
                <>
                    <AlbumTitle
                        isArtist={true}
                        title={data?.data.name}
                        artist={data?.data.name}
                        albumImgUrl={data?.data.image_url}
                        artistImgUrl={data?.data.image_url}
                        totalSongs={data?.data.songs.length}
                        totalDuration={data?.data.songs
                            .map((item) => item.duration)
                            .reduce((a, b) => a + b, 0)}
                        songId={data?.data.songs.map((item) => item.id)}
                    />
                    <ListSong
                        songs={data?.data.songs}
                        imageUrl={data?.data.image_url}
                    />
                </>
            )}
        </>
    );
}
