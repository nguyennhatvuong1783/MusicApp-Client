"use client";
import ContextList from "@/components/ContextList/ContextList";
import { useParams } from "next/navigation";

export default function Section() {
    const params = useParams<{ key: string }>();
    const { key } = params;
    return <ContextList contextKey={key} />;
}
