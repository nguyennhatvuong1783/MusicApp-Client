"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import ItemAlbum from "../ItemAlbum/ItemAlbum";
import Footer from "../Footer/Footer";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import type {
    Album,
    ApiResponse,
    Artist,
    Pagination,
    Song,
} from "@/types/auth";

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
        <div className="h-full rounded-md bg-(image:--gradient-color)">
            <ScrollArea className="h-[calc(100vh-70px)] px-3">
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/0"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular albums and singles
                                </Link>
                                <Link
                                    href="/section/0"
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
                            albumsData?.data.data.map((item) => (
                                <ItemAlbum
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artist.name}
                                    imgUrl={item.image_url}
                                    url={`/album/${item.id}`}
                                    artistId={item.artist.id}
                                    songId={item.songs?.map((song) => song.id)}
                                />
                            ))}
                    </div>
                </div>
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/1"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Popular artists
                                </Link>
                                <Link
                                    href="/section/1"
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
                            ArtistsData?.data.data.map((item) => (
                                <ItemAlbum
                                    key={item.id}
                                    title={item.name}
                                    imgUrl={item.image_url}
                                    url={`/artist/${item.id}`}
                                    artistId={item.id}
                                    songId={item.songs?.map((song) => song.id)}
                                />
                            ))}
                    </div>
                </div>
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-2 flex items-end justify-between px-3 font-bold">
                        {!keyword ? (
                            <>
                                <Link
                                    href="/section/2"
                                    className="text-2xl decoration-2 hover:underline"
                                >
                                    Trending songs
                                </Link>
                                <Link
                                    href="/section/2"
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
                            SongsData?.data.data.map((item) => (
                                <ItemAlbum
                                    key={item.id}
                                    title={item.title}
                                    artist={item.artists
                                        ?.map((artist) => artist.name)
                                        .join(", ")}
                                    imgUrl="https://www.shyamh.com/images/blog/music.jpg"
                                    artistId={item.artists[0].id}
                                    isSong={true}
                                    song={item}
                                />
                            ))}
                    </div>
                </div>
                <Footer />
            </ScrollArea>
        </div>
    );
};

export default Content;
