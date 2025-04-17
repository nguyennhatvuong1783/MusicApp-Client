"use client";
import Header from "@/components/Header/Header";
import MainContent from "@/components/MainContent/MainContent";
import PlayerBar from "@/components/PlayerBar/PlayerBar";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useAuth();

    return (
        <div className="flex h-screen flex-col gap-2 p-2">
            <Header />
            <PlayerProvider>
                <MainContent Content={children} />
                {user && <PlayerBar />}
            </PlayerProvider>
        </div>
    );
}
