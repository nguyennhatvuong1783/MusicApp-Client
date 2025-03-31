import Header from "@/components/Header/Header";
import MainContent from "@/components/MainContent/MainContent";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <MainContent Content={children} />
        </>
    );
}
