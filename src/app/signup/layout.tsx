import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign up - Music",
    description: "Generated by create next app",
};

export default function SignupLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
