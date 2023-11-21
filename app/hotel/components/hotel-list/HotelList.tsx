"use client";
import { useHotelStore } from "@/app/store/hotel-store/hotel.store";
import { FC, useEffect } from "react";

interface IProps {}

const HotelList: FC<IProps> = () => {
    const { hotels, getAllHotels } = useHotelStore();

    useEffect(() => {
        getAllHotels();

        return () => {};
    }, [getAllHotels]);

    return (
        <div>
            <h1>Hotel List</h1>

            <div>
                {hotels.map((hotel) => (
                    <div key={hotel.id}>
                        <h2>{hotel.name}</h2>
                        <p>{hotel.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;
