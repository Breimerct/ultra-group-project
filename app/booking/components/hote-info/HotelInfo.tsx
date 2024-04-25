import { FC } from "react";
import { CurrentLocationIcon } from "@components/Icons";
import StarRate, { StartPosition } from "@components/StarRate";
import { IHotelResponse, IRoom } from "@/types";

interface IHotelInfoProps {
    hotel: IHotelResponse | null;
    room: IRoom | null;
}

const HotelInfo: FC<IHotelInfoProps> = ({ hotel, room }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <picture className="h-full w-auto col-span-1">
                <img
                    src={hotel?.imageUrl || "-"}
                    alt={hotel?.name}
                    loading="lazy"
                    className="w-auto h-80 lg:h-96 mx-auto object-cover bg-center rounded-md shadow-xl"
                />
            </picture>
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 col-span-1 lg:col-span-2">
                <div className="col-span-1 flex gap-3 flex-col">
                    <h1 className="font-semibold text-2xl text-zinc-700">
                        {" "}
                        {hotel?.name}{" "}
                    </h1>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">
                            Ubicación del hotel
                        </label>
                        <p className="flex flex-nowrap items-center text-lg ">
                            <CurrentLocationIcon />
                            <span className="ml-2"> {hotel?.city.name} </span>
                        </p>
                    </div>

                    <div>
                        <StarRate
                            size={hotel?.stars ?? 0}
                            startPosition={StartPosition.LEFT}
                        />
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-2 mt-3 md:mt-0">
                    <h4 className="font-semibold text-2xl text-zinc-700"> Habitación </h4>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">
                            Nombre de la habitación
                        </label>
                        <p> {room?.name} </p>
                    </div>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">
                            Descripción
                        </label>
                        <p className="text-lg"> {room?.description} </p>
                    </div>

                    <div>
                        <StarRate size={room?.stars} startPosition={StartPosition.LEFT} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelInfo;
