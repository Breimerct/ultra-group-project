"use client";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC } from "react";
import SkeletonHotelList from "./SkeletonHotelList";
import { StartIcon } from "@/app/components/Icons";

interface IProps {}

const HotelList: FC<IProps> = () => {
    const { hotels, isLoadingHotels } = useHotelStore();

    return (
        <div>
            <div className="mt-4 p-2 grid grid-cols-1 gap-y-4">
                {hotels.length <= 0 && isLoadingHotels && <SkeletonHotelList />}

                {hotels.length <= 0 && !isLoadingHotels && (
                    <p className="text-center text-2xl font-bold">
                        No hay hoteles disponibles
                    </p>
                )}

                {hotels.map((hotel) => (
                    <div
                        key={hotel.id}
                        className="bg-zinc-50 flex flex-col md:flex-row rounded-md shadow-md"
                    >
                        <picture className="w-full h-60 sm:h-full max-h-[16rem] md:max-w-[16rem]">
                            <img
                                src={hotel.imageUrl}
                                alt={hotel.name}
                                className="h-full w-full object-cover aspect-square"
                            />
                        </picture>

                        <div className="p-4 h-full w-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    {hotel.name}
                                </h1>
                                <p className="h-full">{hotel.description}</p>
                            </div>

                            <div>
                                <p className="text-2xl mt-2 w-full flex justify-end flex-nowrap gap-2 text-yellow-400">
                                    {Array.from({
                                        length: hotel.stars ?? 0,
                                    }).map((_, index) => (
                                        <StartIcon key={index} />
                                    ))}
                                </p>
                                <button className="mt-2 outline-emerald-800 outline-1 outline text-emerald-800 text-xs py-2 px-4 rounded-md hover:outline-none-none hover:bg-emerald-800 hover:text-white hover:shadow-sm hover:shadow-emerald-900 transition-all ease-in-out">
                                    Reservar ahora
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
