import Footer from "@/components/Footer/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Album | Music",
    description: "Generated by create next app",
};

export default function AlbumLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="h-full overflow-hidden rounded-md bg-(--main-color)">
            <ScrollArea className="h-[calc(100vh-70px)]">
                {children}
                <Footer />
            </ScrollArea>
        </div>
    );
}
