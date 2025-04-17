import Image from "next/image";
import ButtonPlay from "../Buttons/PlayButton";
import Link from "next/link";
import { AddIcon, ListIcon, MoreIcon } from "../icons/Icons";
import { formatDuration } from "@/lib/utils";
import { usePlayer } from "@/hooks/usePlayer";
import { Song } from "@/types/song";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AlbumHeaderProps {
    title: string;
    artist?: string;
    artistId?: number;
    PriImgUrl?: string;
    SecImgUrl: string;
    totalSongs?: number;
    totalDuration: number;
    type: "song" | "album" | "artist" | "playlist";
    contextId: number;
    songs: Song[];
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({
    title,
    artist = undefined,
    artistId = undefined,
    PriImgUrl = "https://www.shyamh.com/images/blog/music.jpg",
    SecImgUrl,
    totalSongs = 0,
    totalDuration,
    type = "song",
    contextId,
    songs,
}) => {
    const router = useRouter();
    const { user } = useAuth();
    const { playPlaylist } = usePlayer();

    const handleClickButtonPlay = () => {
        if (!user) {
            router.push("/login");
            return;
        }
        playPlaylist(
            {
                id: contextId,
                name: title,
                playMode: type,
                songs: songs,
            },
            0,
        );
    };

    return (
        <div className="flex min-w-full flex-col">
            <div className="relative flex p-6">
                <Image
                    src={PriImgUrl}
                    alt="Image"
                    fill
                    className="absolute z-0 overflow-hidden object-cover shadow-[0px_0px_40px_rgba(0,0,0,0.4)] blur-3xl brightness-95"
                />
                <div className="z-10 mr-6 flex flex-col justify-end">
                    <Image
                        src={PriImgUrl}
                        alt="Image"
                        width={221}
                        height={221}
                        className="aspect-square cursor-pointer overflow-hidden rounded-sm object-cover shadow-[0px_0px_40px_rgba(0,0,0,0.4)] transition-all duration-200 hover:scale-102"
                    />
                </div>
                <div className="z-10 flex flex-1 flex-col justify-end gap-2">
                    <p className="text-sm font-medium">
                        {
                            {
                                song: "Song",
                                album: "Album",
                                artist: "Artist",
                                playlist: "Playlist",
                            }[type]
                        }
                    </p>
                    <h1 className="cursor-default text-6xl/tight font-extrabold">
                        {title}
                    </h1>
                    {/* <AutoTextSize text="BẬT NÓ LÊN" /> */}
                    <div className="mt-3 flex items-center gap-1 truncate">
                        <Image
                            src={SecImgUrl}
                            alt="Image"
                            width={24}
                            height={24}
                            className="aspect-square overflow-hidden rounded-full object-cover"
                        />
                        {artist && artistId && (
                            <Link
                                href={`/artist/${artistId}`}
                                className="text-sm font-bold hover:underline"
                            >
                                {artist}
                            </Link>
                        )}
                        <ul className="ml-4 flex list-disc gap-5 text-sm font-medium opacity-80">
                            <li className="-indent-[6px]">2025</li>
                            <li className="-indent-[6px]">
                                {formatDuration(totalSongs, totalDuration)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-6">
                    <ButtonPlay
                        className="p-4"
                        onClick={handleClickButtonPlay}
                    />
                    <div>
                        <AddIcon className="h-8 w-8 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:text-(--text-color) active:scale-100 active:text-(--secondary-text-color)" />
                    </div>
                    <div>
                        <MoreIcon className="h-8 w-8 cursor-pointer text-(--secondary-text-color) hover:scale-105 hover:text-(--text-color) active:scale-100 active:text-(--secondary-text-color)" />
                    </div>
                </div>
                <div className="flex cursor-pointer items-center gap-2 px-2 text-(--secondary-text-color) hover:text-(--text-color)">
                    <span className="pb-0.5 text-sm font-medium">List</span>
                    <ListIcon className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default AlbumHeader;
