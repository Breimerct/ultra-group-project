"use client";
import { FC, useEffect, useState } from "react";
import DetailModal from "../detail-modal/DetailModal";
import { useBookingStore } from "@store/booking-store/booking.store";
import { EyeSearchIcon } from "@components/Icons";
import { IBooking } from "@/types";
import useCurrentUser from "@/hooks/current-user/useCurrentUser";

const BookingTable: FC = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const { findBookings, bookings, findBookingDetail } = useBookingStore();
    const user = useCurrentUser();

    useEffect(() => {
        const userId = user?.role === "admin" ? null : user?._id;
        findBookings(userId);
    }, []);

    const handleSeeDetails = (booking: IBooking) => {
        findBookingDetail(booking._id).then(() => setShowDetailModal(true));
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
    };

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm font-light text-center">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Check In
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Check Out
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Contacto de Emergencia
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length == 0 && (
                            <tr
                                className="border-b dark:border-neutral-500 text-center bg-gray-500/20"
                                aria-colspan={5}
                            >
                                <td
                                    colSpan={5}
                                    className="whitespace-nowrap px-6 py-4 font-bold text-3xl md:text-5xl text-black/50"
                                >
                                    No hay reservas
                                </td>
                            </tr>
                        )}
                        {bookings.map((booking, index) => (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {booking.checkIn}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {booking.checkOut}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {booking.emergencyContact.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <button
                                        className="bg-emerald-800 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                        onClick={() => handleSeeDetails(booking)}
                                    >
                                        <EyeSearchIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DetailModal isOpen={showDetailModal} onClose={handleCloseModal} />
        </div>
    );
};

export default BookingTable;
