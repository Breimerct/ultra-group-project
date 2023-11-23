"use client";
import { CloseIcon } from "@/app/components/Icons";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import UserInfo from "../user-info/UserInfo";
import { useAuthStore } from "@/app/store/auth-store/auth.store";
import CompanionsTable from "./CompanionsTable";
import { IBooking } from "@/app/api/booking/bookings.service";
import { useBookingStore } from "@/app/store/booking-store/booking.store";

interface IProps {
    isOpen: boolean;
    onClose?: () => void;
}

const DetailModal: FC<IProps> = ({ isOpen, onClose }) => {
    const { user } = useAuthStore();
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
            <div
                className={`${
                    show ? "grid" : "hidden"
                } fixed inset-0 z-50 overflow-y-auto h-screen place-content-center transition-all backdrop-blur-[4px]`}
            >
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl w-full max-w-4xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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

                        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="col-span-2">
                                <h4 className="text-xl font-semibold mb-1">Datos del cliente</h4>

                                <UserInfo user={user} />
                            </div>

                            <div className="col-span-2">
                                <CompanionsTable companions={(booking && booking.companions) || []} />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
