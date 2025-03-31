import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import ItemAlbum from "../ItemAlbum/ItemAlbum";
import Footer from "../Footer/Footer";

interface ListAlbumProps {
    id?: string;
}

const ListAlbum: React.FC<ListAlbumProps> = ({ id = 0 }) => {
    return (
        <div className="h-full rounded-md bg-(--main-color)">
            <ScrollArea className="h-[calc(100vh-70px)] px-3">
                <div className="my-5 mb-10 overflow-hidden">
                    <div className="mb-9 flex items-end justify-between px-3 pt-13 font-bold">
                        <p className="text-3xl">Trending songs {id}</p>
                    </div>
                    <div className="grid grid-cols-5 gap-y-6">
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                        <ItemAlbum />
                    </div>
                </div>
                <Footer />
            </ScrollArea>
        </div>
    );
};

export default ListAlbum;
