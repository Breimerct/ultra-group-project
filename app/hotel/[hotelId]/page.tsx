"use client";
import StarRate from "@/app/components/StarRate";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";

const Page: FC = () => {
    const { hotelId } = useParams();
    const { getHotelById, hotel } = useHotelStore();

    useEffect(() => {
        getHotelById(hotelId as string);
    }, []);

    return (
        <>
            <section className="grid grid-cols-1 justify-center md:grid-cols-3 gap-3 mt-4">
                <picture className="col-span-1">
                    <img
                        src={hotel?.imageUrl}
                        alt={hotel?.name}
                        className="object-cover max-w-full max-h-72 md:max-h-[20rem] md:max-w-[20rem] w-full h-full"
                    />
                    <StarRate size={hotel?.stars ?? 0} />
                </picture>

                <div>
                    <h1 className="text-5xl font-bold">{hotel?.name}</h1>
                    <p className="mt-2">{hotel?.description}</p>
                </div>
            </section>
        </>
    );
};

export default Page;
