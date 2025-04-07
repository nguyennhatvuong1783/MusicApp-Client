import AlbumTitle from "@/components/AlbumTitle/AlbumTitle";
import ListSong from "@/components/ListSong/ListSong";

export default async function Album({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <>
            <AlbumTitle />
            <ListSong />
            <span className="hidden">{id}</span>
        </>
    );
}
