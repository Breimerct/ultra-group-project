"use client";
import { useRoomStore } from "@/app/store/room-store/room.store";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import RoomsListItem from "./RoomListItem";

interface IProps {
    checkIn?: string | null;
    checkOut?: string | null;
}

const RoomsList: FC<IProps> = ({ checkIn, checkOut }) => {
    const { hotelId } = useParams() as { hotelId: string };
    const { getRoomsByHotelAndDate, rooms } = useRoomStore();

    useEffect(() => {
        getRoomsByHotelAndDate(hotelId || null, checkIn || undefined, checkOut || undefined);
    }, []);

    return (
        <div className="w-full">
            <section>
                <h1 className="text-5xl font-bold mt-4 mb-3">Habitaciones</h1>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
                {rooms?.length <= 0 && (
                    <div className="h-full w-full relative col-span-2">
                        <p className="absolute top-0 bottom-0 left-0 mt-20 text-neutral-600/40 select-none text-center text-5xl w-full md:text-7xl font-bold">
                            No hay habitaciones disponibles
                        </p>
                    </div>
                )}

                {rooms?.map((room) => (
                    <RoomsListItem key={room._id} room={room} />
                ))}
            </section>
        </div>
    );
};

export default RoomsList;
