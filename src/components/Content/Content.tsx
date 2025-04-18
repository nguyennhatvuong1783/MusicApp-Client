"use client";
import React from "react";
import AlbumItem from "../AlbumItem/AlbumItem";
import Link from "next/link";
import { ApiResponse, Pagination } from "@/types/api";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import useSWR from "swr";
import { fetcher } from "@/lib/api";

interface ContentProps {
    keyword?: string | null;
}
const Content: React.FC<ContentProps> = ({ keyword = null }) => {
    const {
        data: albumsData,
        error: AlbumsError,
        isLoading: isAlbumsLoading,
    } = useSWR<ApiResponse<Pagination<Album>>>(
        `albums?${keyword ? `?search=${keyword}` : "?per_page=5"}`,
        fetcher,
    );

    const {
        data: ArtistsData,
        error: ArtistsError,
        isLoading: isArtistsLoading,
    } = useSWR<ApiResponse<Pagination<Artist>>>(
        `artists?${keyword ? `?name=${keyword}` : "?per_page=5"}`,
        fetcher,
    );

    const {
        data: SongsData,
        error: SongsError,
        isLoading: isSongsLoading,
    } = useSWR<ApiResponse<Pagination<Song>>>(
        `songs${keyword ? `?search=${keyword}` : "?per_page=5"}`,
        fetcher,
    );

    if (AlbumsError) return <div>Error when loading albums</div>;
    if (ArtistsError) return <div>Error when loading artists</div>;
    if (SongsError) return <div>Error when loading songs</div>;

    return (
        <div className="px-3">
            {albumsData?.data?.data.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/albums"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular albums and singles
                                </Link>
                                <Link
                                    href="/section/albums"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Albums</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isAlbumsLoading &&
                            albumsData?.data &&
                            albumsData?.data.data.map((item) => (
                                <AlbumItem
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artist.name}
                                    artistId={item.artist.id}
                                    imgUrl={item.image_url}
                                    contextId={item.id}
                                    songs={item.songs}
                                    type="album"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
            {ArtistsData?.data?.data.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/artists"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular artists
                                </Link>
                                <Link
                                    href="/section/artists"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Artists</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isArtistsLoading &&
                            ArtistsData?.data &&
                            ArtistsData?.data.data.map((item) => (
                                <AlbumItem
                                    key={item.id}
                                    title={item.name}
                                    imgUrl={item.image_url}
                                    contextId={item.id}
                                    songs={item.songs}
                                    type="artist"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
            {SongsData?.data?.data.length ? (
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/songs"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Trending songs
                                </Link>
                                <Link
                                    href="/section/songs"
                                    className="text-sm text-(--secondary-text-color) hover:underline"
                                >
                                    Show all
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl decoration-2">Songs</p>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-5">
                        {!isSongsLoading &&
                            SongsData?.data &&
                            SongsData?.data.data.map((item) => (
                                <AlbumItem
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artists
                                        ?.map((artist) => artist.name)
                                        .join(", ")}
                                    artistId={item.artists[0].id}
                                    contextId={item.id}
                                    songs={[item]}
                                    type="song"
                                />
                            ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Content;
