import ListAlbum from "@/components/ListAlbum/ListAlbum";
import { use } from "react";

interface SectionPageParams {
    id: string;
}

export default function Section({ params }: { params: SectionPageParams }) {
    // No error =))
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    // No error =))

    return <ListAlbum id={id} />;
}
