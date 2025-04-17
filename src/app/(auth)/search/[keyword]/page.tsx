"use client";
import Content from "@/components/Content/Content";
import { useParams } from "next/navigation";

export default function Search() {
    const params = useParams<{ keyword: string }>();
    const { keyword } = params;

    return <Content keyword={keyword} />;
}
