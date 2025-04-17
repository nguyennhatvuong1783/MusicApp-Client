"use client";
import React, { useEffect, useRef, useState } from "react";
import { MusicChat, Profile } from "../icons/Icons";
import SearchInput from "../TextInput/SearchInput";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";
import ButtonHome from "../Buttons/HomeButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
    const router = useRouter();
    const { isLoading, user, handleLogout } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear timeout cũ nếu có
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Đặt timeout mới (500ms sau khi ngừng nhập)
        timeoutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const handleSearch = (term: string) => {
        console.log("Searching for:", term);
        if (!term || term === "") router.push("/");
        else router.push(`/search/${term}`);
    };

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="flex w-full items-center">
            <Link href={"/"}>
                <div className="flex w-18 items-center justify-center">
                    <MusicChat className="h-10 w-10 cursor-pointer text-(--text-color)" />
                </div>
            </Link>
            <div className="flex flex-1 items-center">
                <div className="ml-2">
                    <ButtonHome />
                </div>
                <SearchInput onChange={handleInputChange} value={searchTerm} />
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 font-bold">
                <TextButton text="Premium" href="#" />
                <TextButton text="Support" href="#" />
                <TextButton text="Download" href="#" />
                <div className="mx-4 h-7 w-[1px] bg-(--text-color)"></div>
                {user && (
                    <>
                        <TextButton
                            text="Log out"
                            href="/"
                            onClick={handleLogout}
                        />
                        <Link href="/profile">
                            <Profile className="ml-2 h-9 w-9 cursor-pointer rounded-full p-[7px] ring-1 hover:text-(--green-color)" />
                        </Link>
                    </>
                )}
                {!user && !isLoading && (
                    <>
                        <TextButton text="Sign up" href="/signup" />
                        <Button
                            className="ml-2 px-8 py-3"
                            text="Log in"
                            href="/login"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
