"use client";

import { EditIcon, EyeSearchIcon, LoaderIcon, TrashIcon } from "@/app/components/Icons";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC, useEffect } from "react";
import StatusBadget from "../StatusBadget";
import { IHotel } from "@/app/api/hotel/hotel.service";

interface IProps {
    onEdit?: (hotel: IHotel) => void;
    onView?: (hotel: IHotel) => void;
    onRemove?: (hotel: IHotel) => void;
}

const HotelsTable: FC<IProps> = ({ onEdit, onView, onRemove }) => {
    const { hotels, getAllHotelsToAdmin, isLoadingHotels } = useHotelStore();

    useEffect(() => {
        getAllHotelsToAdmin();
    }, []);

    const handleEdit = (hotel: IHotel) => {
        onEdit && onEdit(hotel);
    };

    const handleView = (hotel: IHotel) => {
        onView && onView(hotel);
    };

    const handleRemove = (hotel: IHotel) => {
        onRemove && onRemove(hotel);
    };

    return (
        <>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm font-light text-center bg-white">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Presentación
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Estrellas
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-4 sticky right-[-1px] bg-white">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingHotels && hotels.length == 0 && (
                            <tr className="border-b dark:border-neutral-500 text-center bg-gray-500/20">
                                <td
                                    colSpan={7}
                                    className="whitespace-nowrap px-6 py-4 font-bold text-3xl md:text-5xl text-black/50"
                                >
                                    <div className="flex flex-nowrap gap-2 justify-center items-center">
                                        <span>Cargando...</span>
                                        <span className="animate-spin text-2xl">
                                            <LoaderIcon />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!isLoadingHotels && hotels.length == 0 && (
                            <tr className="border-b dark:border-neutral-500 text-center bg-gray-500/20">
                                <td
                                    colSpan={7}
                                    className="whitespace-nowrap px-6 py-4 font-bold text-3xl md:text-5xl text-black/50"
                                >
                                    No hay hoteles
                                </td>
                            </tr>
                        )}

                        {hotels.map((hotel, index) => (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <picture className="text-center flex justify-center">
                                        <img src={hotel.imageUrl} alt={hotel.name} className="w-16 h-16 rounded-full" />
                                    </picture>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">{hotel.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{hotel.description}</td>
                                <td className="whitespace-nowrap px-6 py-4">{hotel.stars}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {
                                        <StatusBadget status={hotel.isAvailable}>
                                            {hotel.isAvailable ? "Disponible" : "No disponible"}
                                        </StatusBadget>
                                    }
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 sticky right-[-1px] bg-white">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            className="bg-blue-600 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-blue-500 hover:shadow-sm hover:shadow-blue-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleEdit(hotel)}
                                        >
                                            <EditIcon />
                                        </button>

                                        <button
                                            className="bg-red-600 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-red-500 hover:shadow-sm hover:shadow-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleEdit(hotel)}
                                        >
                                            <TrashIcon />
                                        </button>

                                        <button
                                            className="bg-emerald-800 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleView(hotel)}
                                        >
                                            <EyeSearchIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HotelsTable;
