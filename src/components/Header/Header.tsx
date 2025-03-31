import React from "react";
import { Spotify } from "../icons/Icons";
import Textbox from "../Textbox/Textbox";
import Button from "../Buttons/Button";
import TextButton from "../Buttons/TextButton";
import ButtonHome from "../Buttons/ButtonHome";
import Link from "next/link";

const Header = () => {
    return (
        <div className="fixed flex w-full items-center p-2">
            <Link href={"/"}>
                <div className="flex w-18 items-center justify-center">
                    <Spotify className="h-8 w-8 cursor-pointer text-(--text-color)" />
                </div>
            </Link>
            <div className="flex items-center">
                <div className="ml-2">
                    <ButtonHome />
                </div>
                <div className="px-2">
                    <Textbox />
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center gap-2 font-bold">
                <TextButton text="Premium" href="#" />
                <TextButton text="Support" href="#" />
                <TextButton text="Download" href="#" />
                <div className="mx-4 h-7 w-[1px] bg-(--text-color)"></div>
                <TextButton text="Sign up" href="#" />
                <Button
                    className="ml-2 px-8 py-3"
                    text="Log in"
                    href="/login"
                />
            </div>
        </div>
    );
};

export default Header;
