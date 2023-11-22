"use client";
import StarRate from "@/app/components/StarRate";
import RoomsList from "@/app/room/components/RoomsList";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";

const Page: FC = () => {
    const { hotelId } = useParams() as { hotelId: string };
    const { getHotelById, hotel } = useHotelStore();

    useEffect(() => {
        getHotelById(hotelId as string);
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <section className="grid grid-cols-1 justify-center md:grid-cols-3 gap-3 mt-4">
                <picture className="col-span-1">
                    <img
                        src={hotel?.imageUrl}
                        alt={hotel?.name}
                        className="object-cover max-w-full max-h-72 md:max-h-[20rem] md:max-w-[20rem] w-full h-full"
                    />
                </picture>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">{hotel?.name}</h1>
                        <p className="mt-2">{hotel?.description}</p>
                    </div>
                    <StarRate
                        size={hotel?.stars ?? 0}
                        className="self-start flex flex-nowrap gap-2 text-yellow-500"
                    />
                </div>
            </section>

            <section>
                <RoomsList hotelId={hotelId} />
            </section>
        </div>
    );
};

export default Page;
