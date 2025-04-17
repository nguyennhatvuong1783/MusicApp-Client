"use client";

import React from "react";
import { Home, HomeOutline } from "../icons/Icons";
import { usePathname, useRouter } from "next/navigation";

const ButtonHome = () => {
    const currentPath = usePathname();
    const router = useRouter();

    return (
        <div
            onClick={() => router.push("/")}
            className="cursor-pointer rounded-full bg-(--secondary-color) p-3 transition duration-100 hover:scale-105 hover:brightness-150 active:scale-100 active:opacity-75"
        >
            {currentPath === `/` ? (
                <Home className="h-6 w-6 text-(--text-color)" />
            ) : (
                <HomeOutline className="h-6 w-6 text-(--secondary-text-color)" />
            )}
        </div>
    );
};

export default ButtonHome;
