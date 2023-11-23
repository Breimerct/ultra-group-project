"use client";
import Header from "@/app/components/header/Header";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { FC, use } from "react";

const BookingHeader: FC = () => {
    const { user } = useAuthStore();

    return (
        <header
            className="min-h-[25rem] bg-cover bg-center bg-no-repeat relative mb-10"
            style={{ backgroundImage: "url('/background-booking-page.webp')" }}
        >
            <Header className="w-full relative z-20 bg-transparent text-white" />

            <div className="absolute left-0 top-0 w-full h-full z-10 grid place-content-center">
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl relative after:content-['Reservas'] after:absolute after:top-[3px] after:left-0 after:text-black/30 shadow-inner shadow--black">
                    Reservas
                </h1>
            </div>
        </header>
    );
};

export default BookingHeader;
