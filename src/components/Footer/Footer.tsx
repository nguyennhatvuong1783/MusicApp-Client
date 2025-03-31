import React from "react";
import { Facebook, Instagram, Twitter } from "../icons/Icons";

const Footer = () => {
    return (
        <div className="block px-5">
            <div className="flex justify-between border-b-2 border-(--secondary-color) py-10">
                <div className="flex flex-col gap-y-1 text-(--secondary-text-color)">
                    <p className="font-bold text-(--text-color)">Company</p>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        About
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Jobs
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        For the Record
                    </span>
                </div>
                <div className="flex flex-col gap-y-1 text-(--secondary-text-color)">
                    <p className="font-bold text-(--text-color)">Communities</p>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        For Artists
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Developers
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Advertising
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Investors
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Vendors
                    </span>
                </div>
                <div className="flex flex-col gap-y-1 text-(--secondary-text-color)">
                    <p className="font-bold text-(--text-color)">
                        Useful links
                    </p>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Support
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Free Mobile App
                    </span>
                </div>
                <div className="flex flex-col gap-y-1 text-(--secondary-text-color)">
                    <p className="font-bold text-(--text-color)">
                        Spotify Plans
                    </p>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Premium Individual
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Premium Student
                    </span>
                    <span className="cursor-pointer self-start decoration-1 hover:text-(--text-color) hover:underline">
                        Spotify Free
                    </span>
                </div>
                <div className="flex items-start gap-x-4">
                    <div className="cursor-pointer rounded-full bg-(--secondary-color) p-3 hover:bg-(--secondary-text-color) active:brightness-60">
                        <Instagram className="h-4 w-4" />
                    </div>
                    <div className="cursor-pointer rounded-full bg-(--secondary-color) p-3 hover:bg-(--secondary-text-color) active:brightness-60">
                        <Twitter className="h-4 w-4" />
                    </div>
                    <div className="cursor-pointer rounded-full bg-(--secondary-color) p-3 hover:bg-(--secondary-text-color) active:brightness-60">
                        <Facebook className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <div className="mb-10 py-10 text-sm text-(--secondary-text-color)">
                <span>© 2025 Spotify AB</span>
            </div>
        </div>
    );
};

export default Footer;
