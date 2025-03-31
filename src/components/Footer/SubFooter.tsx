import React from "react";
import { Language } from "../icons/Icons";

const SubFooter = () => {
    return (
        <div className="mx-6 inline-block">
            <div className="my-8 inline-block text-xs">
                <div className="flex flex-wrap gap-y-3 text-(--secondary-text-color)">
                    <div className="mr-4 cursor-pointer">
                        <span>Legal</span>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <span>Safety & Privacy Center</span>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <span>Privacy Policy</span>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <span>Cookies</span>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <span>About Ads</span>
                    </div>
                    <div className="mr-4 cursor-pointer">
                        <span>Accessibility</span>
                    </div>
                </div>
                <div className="mt-3 cursor-pointer text-(--text-color)">
                    <span className="hover:underline">Cookies</span>
                </div>
            </div>
            <div>
                <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-1 text-sm font-bold ring-1 ring-(--secondary-text-color) hover:scale-103 hover:ring-(--text-color) active:scale-100 active:opacity-80">
                    <Language className="h-4 w-4 text-(--text-color)" />
                    English
                </button>
            </div>
        </div>
    );
};

export default SubFooter;
