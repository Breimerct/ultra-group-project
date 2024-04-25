"use client";

import { FC, useEffect } from "react";
import StatusBadget from "../StatusBadget";
import { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { useRoomStore } from "@store/room-store/room.store";
import { EditIcon, EyeSearchIcon, LoaderIcon, TrashIcon } from "@components/Icons";
import { IRoom } from "@/types";

interface IProps {
    onEdit?: (room: IRoom) => void;
    onView?: (room: IRoom) => void;
    onRemove?: (room: IRoom) => void;
}

const RoomsTable: FC<IProps> = ({ onEdit, onRemove, onView }) => {
    const { rooms, getAllRooms, isLoadingRooms } = useRoomStore();

    useEffect(() => {
        getAllRooms();

        return () => {};
    }, []);

    const handleRemove = (room: IRoom) => {
        onRemove && onRemove(room);
    };

    const handleEdit = (room: IRoom) => {
        onEdit && onEdit(room);
    };

    const handleView = (room: IRoom) => {
        onView && onView(room);
    };

    return (
        <>
            <div className="overflow-x-auto scroll-container w-full">
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
                                Precio
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
                            <th
                                scope="col"
                                className="px-6 py-4 sticky right-[-1px] bg-white"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoadingRooms && rooms.length == 0 && (
                            <tr className="border-b dark:border-neutral-500 text-center bg-gray-500/20">
                                <td
                                    colSpan={8}
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
                        {!isLoadingRooms && rooms.length == 0 && (
                            <tr className="border-b dark:border-neutral-500 text-center bg-gray-500/20">
                                <td
                                    colSpan={8}
                                    className="whitespace-nowrap px-6 py-4 font-bold text-3xl md:text-5xl text-black/50"
                                >
                                    No hay hoteles
                                </td>
                            </tr>
                        )}
                        {rooms.map((room, index) => (
                            <tr className="border-b dark:border-neutral-500" key={index}>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <picture className="flex justify-center items-center">
                                        <img
                                            src={
                                                room?.imageUrls &&
                                                room?.imageUrls.length > 0
                                                    ? room.imageUrls[0]
                                                    : DEFAULT_IMAGE
                                            }
                                            alt={room.name}
                                            className="w-16 h-16 rounded-full"
                                        />
                                    </picture>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {room.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {room.price}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="block whitespace-nowrap text-left max-w-[200px] overflow-hidden text-ellipsis">
                                        {room.description}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {room.stars}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    {
                                        <StatusBadget status={room.isAvailable}>
                                            {room.isAvailable
                                                ? "Disponible"
                                                : "No disponible"}
                                        </StatusBadget>
                                    }
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 sticky right-[-1px] bg-white">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            className="bg-blue-600 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-blue-500 hover:shadow-sm hover:shadow-blue-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleEdit(room)}
                                        >
                                            <EditIcon />
                                        </button>

                                        <button
                                            className="bg-red-600 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-red-500 hover:shadow-sm hover:shadow-red-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleRemove(room)}
                                        >
                                            <TrashIcon />
                                        </button>

                                        <button
                                            className="bg-emerald-800 mx-auto text-white p-3 w-10 h-10 grid place-content-center rounded-full hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                            onClick={() => handleView(room)}
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

export default RoomsTable;
