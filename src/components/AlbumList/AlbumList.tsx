"use client";
import React from "react";
import AlbumItem from "../AlbumItem/AlbumItem";
import { fetcher } from "@/lib/api";
import useSWR from "swr";
import { ApiResponse, Pagination } from "@/types/api";
import { Artist } from "@/types/artist";
import { Album } from "@/types/album";
import { Song } from "@/types/song";

interface ListAlbumProps {
    contextKey: string;
}

const AlbumList: React.FC<ListAlbumProps> = ({ contextKey }) => {
    const { data, error, isLoading } = useSWR<
        ApiResponse<Pagination<Artist | Album | Song>>
    >(contextKey, fetcher);

    if (error) return <div>{`Error when loading ${contextKey}`}</div>;

    const titles: Record<string, string> = {
        artists: "Popular artists",
        songs: "Trending songs",
        albums: "Popular albums and singles",
    };

    const displayTitle = titles[contextKey];

    return (
        <div className="my-5 mb-10 overflow-hidden px-3">
            <div className="mb-9 flex items-end justify-between px-3 pt-13 font-bold">
                <p className="text-3xl">{displayTitle}</p>
            </div>
            <div className="grid grid-cols-5 gap-y-6">
                {!isLoading && data?.data && contextKey == "artists"
                    ? data?.data.data.map((artist) => (
                          <AlbumItem
                              key={artist.id}
                              title={(artist as Artist).name}
                              imgUrl={(artist as Artist).image_url}
                              contextId={artist.id}
                              songs={(artist as Artist).songs}
                              type="artist"
                          />
                      ))
                    : !isLoading && data?.data && contextKey == "songs"
                      ? data?.data.data.map((song) => (
                            <AlbumItem
                                key={song.id}
                                title={(song as Song).title}
                                artist={(song as Song).artists
                                    ?.map((artist) => artist.name)
                                    .join(", ")}
                                artistId={(song as Song).artists[0].id}
                                contextId={song.id}
                                songs={[song as Song]}
                                type="song"
                            />
                        ))
                      : !isLoading && data?.data && contextKey == "albums"
                        ? data?.data.data.map((album) => (
                              <AlbumItem
                                  key={album.id}
                                  title={(album as Album).title}
                                  artist={(album as Album).artist.name}
                                  artistId={(album as Album).artist.id}
                                  imgUrl={(album as Album).image_url}
                                  contextId={album.id}
                                  songs={(album as Album).songs}
                                  type="album"
                              />
                          ))
                        : null}
            </div>
        </div>
    );
};

export default AlbumList;
