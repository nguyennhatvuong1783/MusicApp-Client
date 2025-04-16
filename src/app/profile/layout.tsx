import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile - Music",
    description: "Generated by create next app",
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
