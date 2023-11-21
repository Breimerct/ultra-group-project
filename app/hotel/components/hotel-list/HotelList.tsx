"use client";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC, useEffect } from "react";
import SkeletonHotelList from "./SkeletonHotelList";
import { StartIcon } from "@/app/components/Icons";

interface IProps {}

const HotelList: FC<IProps> = () => {
    const { hotels, getAllHotels } = useHotelStore();

    useEffect(() => {
        getAllHotels();

        return () => {};
    }, [getAllHotels]);

    return (
        <div>
            <div className="mt-4 p-2 grid grid-cols-1 gap-y-4">
                {hotels.length <= 0 && <SkeletonHotelList />}
                {hotels.map((hotel) => (
                    <div
                        key={hotel.id}
                        className="bg-zinc-50 flex flex-col md:flex-row rounded-md shadow-md"
                    >
                        <picture className="w-full h-60 sm:h-full max-h-[16rem] md:max-w-md">
                            <img
                                src={hotel.imageUrl}
                                alt={hotel.name}
                                className="h-full w-full object-cover aspect-square"
                            />
                        </picture>

                        <div className="p-4 h-full">
                            <h1 className="text-4xl font-bold">{hotel.name}</h1>
                            <p className="">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eligendi eveniet sit tempore
                                hic recusandae libero? Optio est accusantium
                                delectus officiis possimus cumque modi magnam
                                numquam. Excepturi optio perspiciatis sit nemo.
                            </p>
                            <p className="text-2xl mt-2 w-full flex justify-end flex-nowrap gap-2 text-yellow-400">
                                {Array.from({ length: hotel.stars ?? 0 }).map(
                                    (_, index) => (
                                        <StartIcon key={index} />
                                    ),
                                )}
                            </p>
                            <button className="mt-2 outline-emerald-800 outline-1 outline text-emerald-800 text-xs py-2 px-4 rounded-md hover:outline-none-none hover:bg-emerald-800 hover:text-white hover:shadow-sm hover:shadow-emerald-900 transition-all ease-in-out">
                                Reservar ahora
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
