import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import CustomLoading from "./components/custom-loading/CustomLoading";

import "react-toastify/dist/ReactToastify.css";
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
                    <ToastContainer theme="colored" limit={4} />
                    <CustomLoading />
                </main>
            </body>
        </html>
    );
}
