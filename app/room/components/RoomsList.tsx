"use client";
import { useRoomStore } from "@/app/store/room-store/room.store";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import RoomsListItem from "./RoomListItem";

interface IProps {
    hotelId?: string;
}

const RoomsList: FC<IProps> = ({}) => {
    const { hotelId } = useParams() as { hotelId: string };
    const { getRoomsByHotelAndDate, rooms } = useRoomStore();

    useEffect(() => {
        getRoomsByHotelAndDate(hotelId || null);
    }, []);

    return (
        <div>
            <section>
                <h1 className="text-5xl font-bold mt-4 mb-3">RoomsList</h1>
            </section>
            <section className="grid grid-cols-2 gap-3">
                {rooms?.map((room) => (
                    <RoomsListItem key={room.id} room={room} />
                ))}
            </section>
        </div>
    );
};

export default RoomsList;
