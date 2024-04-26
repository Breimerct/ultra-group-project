import generateRandomImages from "@/hooks/useRandomImage/useRandomImage";
import { getRooms, isRoomAvailable } from "./room.service";
import { getCityById } from "./common.service";
import { IHotel, IHotelResponse } from "@/types";
import connectDB from "@/lib/mongo";
import hotelModel from "@/models/hotel.model";
import { validateMongoId } from "@/helpers/util";

export async function getHotels(): Promise<IHotel[]> {
    try {
        await connectDB();
        const hotels = await hotelModel.find().lean<IHotel[]>();

        return hotels;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getActiveHotels(): Promise<IHotel[]> {
    try {
        await connectDB();
        const hotelsData: IHotel[] = [];
        const hotels = await hotelModel.find({ isAvailable: true }).lean<IHotel[]>();

        const hotelRooms = await getRooms();

        for (let hotelIndex = 0; hotelIndex < hotels.length; hotelIndex++) {
            const { _id } = hotels[hotelIndex];

            for (
                let hotelRoomIndex = 0;
                hotelRoomIndex < hotelRooms.length;
                hotelRoomIndex++
            ) {
                const { hotelId } = hotelRooms[hotelRoomIndex];

                if (hotelId.toString() === _id?.toString()) {
                    hotelsData.push(hotels[hotelIndex]);
                    break;
                }
            }
        }

        return hotelsData;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getHotelById(hotelId: string): Promise<IHotelResponse> {
    try {
        await Promise.all([connectDB(), validateMongoId(hotelId)]);
        const hotelFound = await hotelModel.findById(hotelId).lean<IHotel>();

        if (!hotelFound) {
            throw new Error("No se encuentra el hotel");
        }

        const city = await getCityById(hotelFound.cityId);

        return {
            ...hotelFound,
            city,
        };
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function getHotelsByCityId(cityId: number): Promise<IHotel[]> {
    try {
        const hotels = await getActiveHotels();

        const hotelsData = hotels.filter((hotel) => hotel.cityId === cityId);

        if (!hotelsData.length) {
            throw new Error("No se encuentran hoteles para esta ciudad");
        }

        return hotelsData;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function filterHotelsByCityAndAvailability(
    cityId: number,
    checkIn: string,
    checkOut: string,
): Promise<IHotel[]> {
    try {
        const hotelsData = (await getActiveHotels()).filter(
            (hotel) => hotel.cityId === cityId,
        );
        return hotelsData.filter(async (hotel) => {
            const hotelRooms = (await getRooms()).filter(
                (room) => room.hotelId.toString() === hotel._id?.toString(),
            );

            if (!hotelRooms.length) return false;

            const hasAvailableRooms = hotelRooms.some(
                async (room) =>
                    room.isAvailable &&
                    (await isRoomAvailable(room._id ?? "", checkIn, checkOut)),
            );

            return hasAvailableRooms;
        });
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function createHotel(hotel: IHotel): Promise<IHotel> {
    try {
        await connectDB();
        const existedHotel = await hotelModel.findOne({ name: hotel.name }).lean();
        console.log(existedHotel);

        if (existedHotel) {
            throw new Error("Este hotel ya existe");
        }

        if (hotel.stars && hotel.stars > 5) {
            throw new Error("Solo se permiten 5 estrellas como máximo");
        }

        const imageUrl = await generateRandomImages();
        const newHotel: IHotel = {
            ...hotel,
            stars: hotel?.stars || 0,
            imageUrl: String(imageUrl),
        };

        const newHotelResult = await hotelModel.create(newHotel);
        return newHotelResult;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function updateHotelById(id: string, hotel: IHotel): Promise<IHotel> {
    try {
        await Promise.all([connectDB(), validateMongoId(id)]);
        const hotelFound = await hotelModel.findById(id).lean<IHotel>();

        if (!hotelFound) {
            throw new Error("No se encuentra el hotel");
        }

        const newData = {
            ...hotelFound,
            ...hotel,
        };

        const hotelUpdated = await hotelModel.findByIdAndUpdate(id, newData, {
            new: true,
        });

        return hotelUpdated;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}

export async function deleteHotelById(hotelId: string): Promise<IHotel> {
    try {
        await Promise.all([connectDB(), validateMongoId(hotelId)]);
        const hotelFound = await hotelModel.findById(hotelId);

        if (!hotelFound) {
            throw new Error("No se encuentra el hotel");
        }

        const hotelDeleted = await hotelModel.findByIdAndDelete(hotelId);

        console.log(hotelDeleted);

        return hotelDeleted;
    } catch (error: Error | any) {
        throw new Error(error);
    }
}
