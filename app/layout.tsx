import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomLoading from "./components/custom-loading/CustomLoading";
import { Toaster } from "sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ultra Group",
    description: "travel agency and tourism",
    keywords: "travel, tourism, agency, ultra, group",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="pb-10">
                    {children}
                    <CustomLoading />
                    <Toaster richColors />
                </main>
            </body>
        </html>
    );
}
