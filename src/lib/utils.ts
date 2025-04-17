import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDuration(
    totalSongs: number,
    totalDuration: number,
): string {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = totalDuration % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours} hr`);
    parts.push(`${minutes} min`);
    parts.push(`${seconds} sec`);

    return `${totalSongs} songs, ${parts.join(" ")}`;
}

export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
