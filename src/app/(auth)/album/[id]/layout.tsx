import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Album | Music",
    description: "Generated by create next app",
};

export default function AlbumLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
