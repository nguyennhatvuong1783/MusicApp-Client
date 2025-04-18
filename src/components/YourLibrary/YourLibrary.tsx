"use client";
import React, { useEffect, useRef, useState } from "react";
import SubLibrary from "../SubLibrary/SubLibrary";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { ListIcon, Search } from "../icons/Icons";
import Image from "next/image";
import { ApiResponse, Pagination } from "@/types/api";
import { Playlist } from "@/types/playlist";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const YourLibrary = () => {
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchKey, setSearchKey] = useState<string>("");
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data, error, isLoading } = useSWR<
        ApiResponse<Pagination<Playlist>>
    >(user ? `playlists` : null, fetcher);

    const onClickPlaylist = (id: number) => {
        router.push(`/playlist/${id}`);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchKey(value);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        // Focus the input when opening
        if (!isSearchOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    if (error) return <div>Error loading playlists</div>;

    if (
        data?.data?.data.length === 0 ||
        (!user && !isLoading && !isUserLoading)
    ) {
        return (
            <div>
                <SubLibrary
                    title="Create your first playlist"
                    subTitle="It's easy, we'll help you"
                    textBtn="Create playlist"
                />
                <SubLibrary
                    title="Let's find some podcasts to follow"
                    subTitle="We'll keep you updated on new episodes"
                    textBtn="Browse podcasts"
                />
            </div>
        );
    }

    return (
        !isUserLoading && (
            <>
                <div className="my-3 flex items-center justify-between">
                    <div className="ml-2 flex items-center" ref={searchRef}>
                        {!isSearchOpen ? (
                            <button className="p-2" onClick={toggleSearch}>
                                <Search className="h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-white" />
                            </button>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-left flex w-[220px] items-center rounded-md bg-(--secondary-color) px-2 py-2 duration-300">
                                <Search className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchKey}
                                    onChange={handleSearch}
                                    placeholder="Search in Your Library"
                                    className="w-full border-none bg-transparent text-sm text-gray-300 outline-none"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>

                    <div className="group mr-2 flex cursor-pointer items-center">
                        <span className="text-sm font-medium text-(--secondary-text-color) transition-all group-hover:text-white">
                            Recents
                        </span>
                        <ListIcon className="m-2 h-4 w-4 text-(--secondary-text-color) transition-all group-hover:text-white" />
                    </div>
                </div>

                <div>
                    {!isLoading && !searchKey
                        ? data?.data?.data.map((playlist) => (
                              <div
                                  key={playlist.id}
                                  className="flex cursor-pointer items-center rounded p-2 transition-all duration-200 outline-none focus-within:!bg-[#5a5a5a] hover:bg-[#2a2a2a] hover:shadow-md"
                                  tabIndex={0}
                                  onClick={() => onClickPlaylist(playlist.id)}
                              >
                                  <Image
                                      src={
                                          playlist.image_url ||
                                          "https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                                      }
                                      alt="Image"
                                      width={48}
                                      height={48}
                                      className="mr-3 flex aspect-square h-12 w-12 rounded object-cover"
                                  />
                                  <div>
                                      <h3 className="font-bold">
                                          {playlist.title}
                                      </h3>
                                      <p className="text-sm font-medium text-(--secondary-text-color)">
                                          Playlist • {user?.username}
                                      </p>
                                  </div>
                              </div>
                          ))
                        : data?.data?.data
                              .filter((playlist) =>
                                  playlist.title
                                      .toLowerCase()
                                      .includes(searchKey.toLowerCase()),
                              )
                              .map((playlist) => (
                                  <div
                                      key={playlist.id}
                                      className="flex cursor-pointer items-center rounded p-2 transition-all duration-200 outline-none focus-within:!bg-[#5a5a5a] hover:bg-[#2a2a2a] hover:shadow-md"
                                      tabIndex={0}
                                      onClick={() =>
                                          onClickPlaylist(playlist.id)
                                      }
                                  >
                                      <Image
                                          src={
                                              playlist.image_url ||
                                              "https://cdn.dribbble.com/userupload/20851422/file/original-b82fd38c350d47a4f8f4e689f609993a.png"
                                          }
                                          alt="Image"
                                          width={48}
                                          height={48}
                                          className="mr-3 flex h-12 w-12 rounded object-cover"
                                      />
                                      <div>
                                          <h3 className="font-bold">
                                              {playlist.title}
                                          </h3>
                                          <p className="text-sm font-medium text-(--secondary-text-color)">
                                              Playlist • {user?.username}
                                          </p>
                                      </div>
                                  </div>
                              ))}
                </div>
            </>
        )
    );
};

export default YourLibrary;
