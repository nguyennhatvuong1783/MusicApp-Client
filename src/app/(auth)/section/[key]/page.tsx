"use client";
import AlbumList from "@/components/AlbumList/AlbumList";
import { useParams } from "next/navigation";

export default function Section() {
    const params = useParams<{ key: string }>();
    const { key } = params;
    return <AlbumList contextKey={key} />;
}
