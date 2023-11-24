"use client";
import { CloseIcon } from "@/app/components/Icons";
import { FC, useEffect, useState } from "react";
import UserInfo from "../user-info/UserInfo";
import CompanionsTable from "./CompanionsTable";
import { useBookingStore } from "@/app/store/booking-store/booking.store";
import ContactEmergency from "./ContactEmergency";

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
                <div className="fixed inset-0 z-50 overflow-y-auto h-screen grid place-content-center transition-all backdrop-blur-[4px]">
                    <div
                        className="block align-bottom mx-4 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-6xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                            <header className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">Detalles de la reserva</h3>
                                <button
                                    className="text-emerald-800 w-10 h-10 p-2 rounded-full hover:scale-105 hover:shadow-sm hover:shadow-zinc-500/60 transition-all"
                                    onClick={handleOnclose}
                                >
                                    <CloseIcon />
                                </button>
                            </header>

                            <main className="grid grid-cols-1 gap-4 mt-4 max-h-80 overflow-y-auto pr-3">
                                <div className="col-span-1">
                                    <h4 className="text-xl font-semibold mb-1">Datos del cliente</h4>

                                    <UserInfo user={booking?.user ?? null} />
                                </div>

                                <hr className="mb-4 mt-6" />

                                <div className="col-span-1">
                                    <h4 className="text-lg font-semibold mb-1">Contacto de Emergencia</h4>

                                    <ContactEmergency emergencyContact={booking?.emergencyContact} />
                                </div>

                                <hr className="mb-4 mt-6" />

                                <div className="col-span-1">
                                    <h4 className="text-lg font-semibold mb-1">Acompañantes</h4>
                                    <CompanionsTable companions={(booking && booking.companions) || []} />
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
