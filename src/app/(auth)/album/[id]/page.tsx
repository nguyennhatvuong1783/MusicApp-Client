"use client";
import AlbumTitle from "@/components/AlbumTitle/AlbumTitle";
import ListSong from "@/components/ListSong/ListSong";
import { fetcher } from "@/lib/api";
import type { Album, ApiResponse } from "@/types/auth";
import { use } from "react";
import useSWR from "swr";

interface AlbumPageParams {
    id: string;
}

export default function Album({ params }: { params: AlbumPageParams }) {
    // No error =))
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    // No error =))

    const { data, error, isLoading } = useSWR<ApiResponse<Album>>(
        `albums/${id}`,
        fetcher,
    );
    if (error) return <div>Error when loading album</div>;

    return (
        <>
            {!isLoading && (
                <>
                    <AlbumTitle
                        title={data?.data.title}
                        artist={data?.data.artist.name}
                        albumImgUrl={data?.data.image_url}
                        artistImgUrl={data?.data.artist.image_url}
                        totalSongs={data?.data.songs.length}
                        totalDuration={data?.data.songs
                            .map((item) => item.duration)
                            .reduce((a, b) => a + b, 0)}
                        artistId={data?.data.artist.id}
                        songId={data?.data.songs.map((item) => item.id)}
                    />
                    <ListSong
                        songs={data?.data.songs}
                        isAlbum={true}
                        imageUrl={data?.data.image_url}
                    />
                </>
            )}
        </>
    );
}
