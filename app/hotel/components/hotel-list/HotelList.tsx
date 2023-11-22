"use client";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC } from "react";
import SkeletonHotelList from "./SkeletonHotelList";
import { StartIcon } from "@/app/components/Icons";
import Link from "next/link";
import StarRate from "@/app/components/StarRate";

interface IProps {}

const HotelList: FC<IProps> = () => {
    const { hotels, isLoadingHotels } = useHotelStore();

    return (
        <div>
            <div className="mt-4 p-2 grid grid-cols-1 gap-y-4">
                {hotels.length <= 0 && isLoadingHotels && <SkeletonHotelList />}

                {hotels.length <= 0 && !isLoadingHotels && (
                    <div className="h-full w-full relative">
                        <p className="absolute top-0 bottom-0 left-0 mt-40 text-neutral-600/40 select-none text-center text-7xl font-bold">
                            No hay hoteles disponibles
                        </p>
                    </div>
                )}

                {hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-zinc-50 flex flex-col md:flex-row rounded-md shadow-md">
                        <picture className="w-full h-60 sm:h-full max-h-[16rem] md:max-w-[16rem]">
                            <img
                                src={hotel.imageUrl}
                                alt={hotel.name}
                                className="h-full w-full object-cover aspect-square"
                            />
                        </picture>

                        <div className="p-4 h-full w-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-bold">{hotel.name}</h1>
                                <p className="h-full">{hotel.description}</p>
                            </div>

                            <div>
                                <StarRate size={hotel?.stars ?? 0} />
                                <Link
                                    className="mt-2 outline-emerald-800 outline-1 outline text-emerald-800 text-xs py-2 px-4 rounded-md hover:outline-none-none hover:bg-emerald-800 hover:text-white hover:shadow-sm hover:shadow-emerald-900 transition-all ease-in-out"
                                    href={`/hotel/${hotel.id}`}
                                >
                                    Reservar ahora
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
