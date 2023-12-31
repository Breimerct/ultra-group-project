import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import CustomLoading from "./components/custom-loading/CustomLoading";
import { useRouter } from "next/navigation";

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
                <>
                    {children}
                    <ToastContainer theme="colored" limit={4} />
                    <CustomLoading />
                </>
            </body>
        </html>
    );
}
