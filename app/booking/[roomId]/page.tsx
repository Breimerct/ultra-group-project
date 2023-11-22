"use client";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useRoomStore } from "@/app/store/room-store/room.store";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import UserInfo from "../components/user-info/UserInfo";
import BookingForm from "../components/booking-form/BookingForm";
import { MinusIcon, PlusIcon } from "@/app/components/Icons";

const Page: FC = () => {
    const params = useParams<{ roomId: string }>();
    const { getRoomById, room } = useRoomStore();
    const { user } = useAuthStore();
    const [numberOfCompanions, setNumberOfCompanions] = useState(1);

    const addCompanion = () => {
        setNumberOfCompanions((prevValue) => prevValue + 1);
    };

    const removeCompanion = () => {
        setNumberOfCompanions((prevValue) => prevValue - 1);
    };

    useEffect(() => {
        getRoomById(params.roomId);
    }, [params.roomId]);

    return (
        <div>
            <header
                className="min-h-[20rem] bg-cover bg-center bg-no-repeat relative mb-44"
                style={{ backgroundImage: "url('/background-booking.webp')" }}
            >
                <div className="absolute top-[60%] left-[50%] translate-x-[-50%] z-10 flex flex-col justify-center min-h-[20rem] max-w-md w-full">
                    <picture className="flex justify-center items-center">
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="object-cover aspect-square rounded-full h-40 w-40 border-4 border-white bg-white shadow-xl"
                        />
                    </picture>
                    <div className="w-full">
                        <h1 className="text-lg font-bold text-center">
                            {user?.name}
                        </h1>
                        <p className="text-md text-center">{user?.email}</p>
                    </div>
                </div>
            </header>

            <main className="w-full p-10 mx-auto grid grid-cols-2 gap-5 justify-between">
                <section className="w-full col-span-1 max-w-xl mx-auto flex flex-col justify-start items-center">
                    <h3 className="text-2xl font-semibold mb-3">
                        Datos del usuario
                    </h3>
                    <UserInfo user={user} />
                </section>

                <section className="w-full col-span-1 max-w-xl mx-auto flex flex-col justify-start items-center">
                    <div className="flex justify-between w-full items-center mb-3">
                        <h3 className="text-2xl font-semibold mb-3">
                            Acompañantes
                        </h3>

                        <div className="flex gap-2">
                            <button
                                className="bg-emerald-800 text-white p-3 rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                onClick={removeCompanion}
                                disabled={numberOfCompanions === 1}
                            >
                                <MinusIcon />
                            </button>

                            <button
                                className="bg-emerald-800 text-white p-3 rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                onClick={addCompanion}
                                disabled={numberOfCompanions === 3}
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>
                    <BookingForm numberOfCompanions={numberOfCompanions} />
                </section>
            </main>
        </div>
    );
};

export default Page;
