"use client";
import { CloseIcon } from "@/app/components/Icons";
import { FC, useEffect, useState } from "react";
import UserInfo from "../user-info/UserInfo";
import CompanionsTable from "./CompanionsTable";
import { useBookingStore } from "@/app/store/booking-store/booking.store";
import ContactEmergency from "./ContactEmergency";
import HotelInfo from "../hote-info/HotelInfo";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
}

const DetailModal: FC<IProps> = ({ isOpen, onClose }) => {
    const [show, setShow] = useState(isOpen);
    const { booking } = useBookingStore();

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const handleOnclose = () => {
        onClose && onClose();
        setShow(false);
    };

    return (
        <div>
            {show && (
                <div className="fixed inset-0 z-50 overflow-y-auto h-screen grid place-content-center transition-all backdrop-blur-[5px]">
                    <div
                        className="block align-bottom mx-4 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-screen max-w-6xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white px-6 pt-5 pb-6 min-h-full w-full">
                            <header className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">
                                    Detalles de la reserva
                                </h3>
                                <button
                                    className="text-emerald-800 w-10 h-10 p-2 rounded-full hover:scale-105 hover:shadow-sm hover:shadow-zinc-500/60 transition-all"
                                    onClick={handleOnclose}
                                >
                                    <CloseIcon />
                                </button>
                            </header>

                            <main className="min-h-full h-full max-h-[550px] overflow-y-auto p-10 scroll-container scroll-smooth">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="col-span-1 shadow-xl p-6 rounded-md border-t-4 border-emerald-700">
                                        <h4 className="text-xl font-semibold mb-1">
                                            Datos del Hotel
                                        </h4>

                                        <HotelInfo
                                            hotel={booking?.hotel ?? null}
                                            room={booking?.room ?? null}
                                        />
                                    </div>

                                    <hr className="mb-4 mt-6" />

                                    <div className="col-span-1 shadow-xl p-4 rounded-md border-t-4 border-emerald-700">
                                        <h4 className="text-lg font-semibold mb-1">
                                            Datos del cliente
                                        </h4>

                                        <UserInfo user={booking?.user ?? null} />
                                    </div>

                                    <hr className="mb-4 mt-6" />

                                    <div className="col-span-1 shadow-xl p-4 rounded-md border-t-4 border-emerald-700">
                                        <h4 className="text-lg font-semibold mb-1">
                                            Contacto de Emergencia
                                        </h4>

                                        <ContactEmergency
                                            emergencyContact={booking?.emergencyContact}
                                        />
                                    </div>

                                    <hr className="mb-4 mt-6" />

                                    <div className="col-span-1 shadow-xl p-4 rounded-md border-t-4 border-emerald-700">
                                        <h4 className="text-lg font-semibold mb-4">
                                            Acompañantes
                                        </h4>
                                        <CompanionsTable
                                            companions={
                                                (booking && booking.companions) || []
                                            }
                                        />
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailModal;
