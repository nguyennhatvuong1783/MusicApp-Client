"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import ItemAlbum from "../ItemAlbum/ItemAlbum";
import Footer from "../Footer/Footer";
import { fetcher } from "@/lib/api";
import useSWR from "swr";
import { Album, ApiResponse, Artist, Pagination, Song } from "@/types/auth";

interface ListAlbumProps {
    id?: number;
}

const ListAlbum: React.FC<ListAlbumProps> = ({ id = 1 }) => {
    const getEndpoint = (id: number) => {
        if (id == 1) return "artists";
        if (id == 0) return "albums";
        if (id == 2) return "songs";
        return null;
    };

    const endpoint = getEndpoint(id);
    console.log("🚀 ~ endpoint:", endpoint);

    const { data, error, isLoading } = useSWR<
        ApiResponse<Pagination<Artist | Album | Song>>
    >(endpoint ? endpoint : null, fetcher);

    if (error) return <div>{`Error when loading ${endpoint}`}</div>;

    return (
        <div className="h-full rounded-md bg-(--main-color)">
            <ScrollArea className="h-[calc(100vh-70px)] px-3">
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-9 flex items-end justify-between px-3 pt-13 font-bold">
                        <p className="text-3xl">
                            {id == 1
                                ? "Popular artists"
                                : id == 2
                                  ? "Trending songs"
                                  : "Popular albums and singles"}
                        </p>
                    </div>
                    <div className="grid grid-cols-5 gap-y-6">
                        {!isLoading && id == 1
                            ? data?.data.data.map((artist) => (
                                  <ItemAlbum
                                      key={artist.id}
                                      title={(artist as Artist).name}
                                      imgUrl={(artist as Artist).image_url}
                                      url={`/artist/${artist.id}`}
                                      artistId={artist.id}
                                      songId={(artist as Artist).songs?.map(
                                          (song) => song.id,
                                      )}
                                  />
                              ))
                            : id == 2
                              ? data?.data.data.map((song) => (
                                    <ItemAlbum
                                        key={song.id}
                                        title={(song as Song).title}
                                        artist={(song as Song).artists
                                            ?.map((artist) => artist.name)
                                            .join(", ")}
                                        imgUrl="https://www.shyamh.com/images/blog/music.jpg"
                                        artistId={(song as Song).artists[0].id}
                                        isSong={true}
                                        song={song as Song}
                                    />
                                ))
                              : data?.data.data.map((album) => (
                                    <ItemAlbum
                                        key={album.id}
                                        title={(album as Album).title}
                                        artist={(album as Album).artist.name}
                                        imgUrl={(album as Album).image_url}
                                        url={`/album/${album.id}`}
                                        artistId={(album as Album).artist.id}
                                        songId={(album as Album).songs?.map(
                                            (song) => song.id,
                                        )}
                                    />
                                ))}
                    </div>
                </div>
                <Footer />
            </ScrollArea>
        </div>
    );
};

export default ListAlbum;
