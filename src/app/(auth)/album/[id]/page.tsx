import AlbumTitle from "@/components/AlbumTitle/AlbumTitle";

export default async function Album({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <>
            <AlbumTitle />
            <span>{id}</span>
        </>
    );
}
