"use client";
import { IRoom } from "@/app/api/room/room.service";
import Link from "next/link";
import { FC, useState } from "react";

interface IProps {
    room: IRoom;
}

const RoomsListItem: FC<IProps> = ({ room }) => {
    const [imageSelected, setImageSelected] = useState(0);

    const handleClick = (index: number) => {
        setImageSelected(index);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);
    };

    return (
        <div className="bg-zinc-200 rounded-md overflow-hidden">
            <picture className="flex justify-between items-center">
                <img
                    src={room.imageUrls[imageSelected]}
                    alt={room.name}
                    className="object-cover w-full h-full max-h-[20rem] aspect-square"
                />
            </picture>
            <div className="p-5">
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <p>{room.description}</p>
                <p> {formatPrice(room.price ?? 0)} </p>
            </div>
            <div className="flex justify-center gap-2 m-5">
                {room.imageUrls.map((url, index) => (
                    <picture
                        key={index}
                        onClick={handleClick.bind(null, index)}
                        className="flex cursor-pointer rounded-lg overflow-hidden hover:scale-110 hover:shadow-sm hover:shadow-zinc-800/50 transition-all"
                    >
                        <img
                            src={url}
                            alt={room.name + " " + index}
                            className="object-cover aspect-square w-20 h-20"
                        />
                    </picture>
                ))}
            </div>
            <div className="p-3 m-4 flex justify-end items-center">
                <Link href={`/booking/${room.id}`}>
                    <span className="bg-emerald-800 text-white py-2 px-7 rounded-lg hover:bg-emerald-900 hover:shadow-sm hover:shadow-emerald-800 transition-all">
                        Reservar
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default RoomsListItem;
