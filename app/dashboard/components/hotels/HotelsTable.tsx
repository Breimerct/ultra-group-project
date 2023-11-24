"use client";

import { EyeSearchIcon } from "@/app/components/Icons";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC, useEffect } from "react";
import StatusBadget from "../StatusBadget";

const HotelsTable: FC = () => {
    const { hotels, getAllHotelsToAdmin } = useHotelStore();

    useEffect(() => {
        getAllHotelsToAdmin();
    }, []);

    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full text-sm font-light text-center">
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
                        <th scope="col" className="px-6 py-4">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.length == 0 && (
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
                                <picture className="text-center">
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
                            <td className="whitespace-nowrap px-6 py-4">
                                <button className="bg-emerald-800 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none">
                                    <EyeSearchIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HotelsTable;
