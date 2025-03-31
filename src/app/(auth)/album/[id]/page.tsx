import ListAlbum from "@/components/ListAlbum/ListAlbum";

export default async function Album({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);
    return <ListAlbum id={id} />;
}
