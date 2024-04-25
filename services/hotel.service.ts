import useRandomHotelImage from "@/hooks/useRandomImage/useRandomImage";
import { getRooms, isRoomAvailable } from "./room.service";
import { getCityById } from "./common.service";
import { IHotel, IHotelResponse } from "@/types";
import connectDB from "@/lib/mongo";
import hotelModel from "@/models/hotel.model";

export function getHotels(): Promise<IHotel[]> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
            const hotels = await hotelModel.find().lean<IHotel[]>();
            resolve(hotels);
        } catch (error) {
            reject(error);
        }
    });
}

export function getActiveHotels(): Promise<IHotel[]> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
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

            return resolve(hotelsData);
        } catch (error) {
            return reject(error);
        }
    });
}

export function getHotelById(hotelId: string): Promise<IHotelResponse> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
            const hotelFound = await hotelModel.findById(hotelId).lean<IHotel>();

            if (!hotelFound) {
                return reject("No se encuentra el hotel");
            }

            const city = await getCityById(hotelFound.cityId);

            return resolve({
                ...hotelFound,
                city,
            });
        } catch (error) {
            return reject(error);
        }
    });
}

export function getHotelsByCityId(cityId: number): Promise<IHotel[]> {
    return new Promise(async (resolve, reject) => {
        const hotels = await getActiveHotels();

        const hotelsData = hotels.filter((hotel) => hotel.cityId === cityId);

        if (!hotelsData.length) {
            return reject("No se encuentran hoteles para esta ciudad");
        }

        return resolve(hotelsData);
    });
}

export async function filterHotelsByCityAndAvailability(
    cityId: number,
    checkIn: string,
    checkOut: string,
): Promise<IHotel[]> {
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
}

export function createHotel(hotel: IHotel): Promise<IHotel> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
            const existedHotel = await hotelModel.findOne({ name: hotel.name }).lean();
            console.log(existedHotel);

            if (existedHotel) {
                return reject("Este hotel ya existe");
            }

            if (hotel.stars && hotel.stars > 5) {
                return reject("Solo se permiten 5 estrellas como máximo");
            }

            const imageUrl = await useRandomHotelImage();
            const newHotel: IHotel = {
                ...hotel,
                stars: hotel?.stars || 0,
                imageUrl: String(imageUrl),
            };

            const newHotelResult = await hotelModel.create(newHotel);
            resolve(newHotelResult);
        } catch (error) {
            reject(error);
        }
    });
}

export function updateHotelById(id: string, hotel: IHotel): Promise<IHotel> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
            const hotelFound = await hotelModel.findById(id).lean<IHotel>();

            if (!hotelFound) {
                reject("No se encuentra el hotel");
                return;
            }

            const newData = {
                ...hotelFound,
                ...hotel,
            };

            const hotelUpdated = await hotelModel.findByIdAndUpdate(id, newData, {
                new: true,
            });

            resolve(hotelUpdated);
        } catch (error) {
            reject(error);
        }
    });
}

export function deleteHotelById(hotelId: string): Promise<IHotel> {
    connectDB();
    return new Promise(async (resolve, reject) => {
        try {
            const hotelFound = await hotelModel.findById(hotelId);

            if (!hotelFound) {
                reject("No se encuentra el hotel");
                return;
            }

            const hotelDeleted = await hotelModel.findByIdAndDelete(hotelId);

            console.log(hotelDeleted);

            resolve(hotelDeleted);
        } catch (error) {
            reject(error);
        }
    });
}
