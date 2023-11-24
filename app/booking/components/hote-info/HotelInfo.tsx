import { IHotelResponse } from "@/app/api/hotel/hotel.service";
import { IRoom } from "@/app/api/room/room.service";
import { CurrentLocationIcon } from "@/app/components/Icons";
import StarRate, { StartPosition } from "@/app/components/StarRate";
import { FC } from "react";

interface IHotelInfoProps {
    hotel: IHotelResponse | null;
    room: IRoom | null;
}

const HotelInfo: FC<IHotelInfoProps> = ({ hotel, room }) => {
    return (
        <div className="flex flex-nowrap gap-4">
            <picture className="h-full w-[10.5rem] flex-1">
                <img
                    src={hotel?.imageUrl || "-"}
                    alt={hotel?.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </picture>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
                <div className="col-span-1 flex gap-3 flex-col">
                    <h1 className="font-semibold text-2xl text-zinc-700"> {hotel?.name} </h1>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">Ubicación del hotel</label>
                        <p className="flex flex-nowrap items-center text-lg ">
                            <CurrentLocationIcon />
                            <span className="ml-2"> {hotel?.city.name} </span>
                        </p>
                    </div>

                    <div>
                        <StarRate size={hotel?.stars} startPosition={StartPosition.LEFT} />
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-3 mt-3 md:mt-0">
                    <h4 className="font-semibold text-2xl text-zinc-700"> Habitación </h4>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">Nombre de la habitación</label>
                        <p> {room?.name} </p>
                    </div>

                    <div>
                        <label className="text-md font-semi-bold text-zinc-600">Descripción</label>
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
