import useRandomHotelImage, {
    DEFAULT_IMAGE,
} from "@/hooks/useRandomImage/useRandomImage";
import { RoomService } from "../room/room.service";
import { ICity } from "../app/api/data/cities";
import CommonService from "../data/common.service";

export interface IHotel {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number | null;
    imageUrl: string;
    cityId: number;
    isAvailable: boolean;
}

export interface IHotelResponse extends IHotel {
    city: ICity;
}

const hotels: IHotel[] = [
    {
        id: "1",
        name: "Hotel 1",
        description: "Description 1",
        stars: 3,
        imageUrl: DEFAULT_IMAGE,
        cityId: 210,
        isAvailable: true,
    },
    {
        id: "2",
        name: "Hotel 2",
        description: "Description 2",
        stars: 4,
        imageUrl: DEFAULT_IMAGE,
        cityId: 144,
        isAvailable: true,
    },
    {
        id: "3",
        name: "Hotel 3",
        description: "Description 3",
        stars: 5,
        imageUrl: DEFAULT_IMAGE,
        cityId: 210,
        isAvailable: false,
    },
];

export class HotelService {
    static getHotels(): Promise<IHotel[]> {
        return new Promise((resolve) => {
            resolve(hotels);
        });
    }

    static get getActiveHotels(): Promise<IHotel[]> {
        return new Promise((resolve) => {
            const hotelsData = hotels.filter(async (hotel) => {
                if (!hotel.isAvailable) return false;

                const hotelRooms = (await RoomService.getRooms()).filter(
                    (room) => room.hotelId === hotel.id,
                );

                if (!hotelRooms.length) return false;

                return true;
            });
            resolve(hotelsData);
        });
    }

    static getHotelById(hotelId: string): Promise<IHotelResponse> {
        return new Promise(async (resolve, reject) => {
            const hotelFound = hotels.find((hotel) => hotel.id === hotelId);

            if (!hotelFound) {
                reject("No se encuentra el hotel");
                return;
            }

            const city = await CommonService.getCityById(hotelFound.cityId);

            resolve({
                ...hotelFound,
                city,
            });
        });
    }

    static getHotelsByCityId(cityId: number): Promise<IHotel[]> {
        return new Promise((resolve, reject) => {
            const hotelsData = hotels.filter(
                (hotel) => hotel.cityId === cityId && hotel.isAvailable,
            );

            if (!hotelsData.length) {
                reject("No se encuentran hoteles para esta ciudad");
                return;
            }

            resolve(hotelsData);
        });
    }

    static filterHotelsByCityAndAvailability(
        cityId: number,
        checkIn: string,
        checkOut: string,
    ): IHotel[] {
        const hotelsData = hotels.filter(
            (hotel) => hotel.cityId === cityId && hotel.isAvailable,
        );

        return hotelsData.filter(async (hotel) => {
            const hotelRooms = (await RoomService.getRooms()).filter(
                (room) => room.hotelId === hotel.id,
            );

            if (!hotelRooms.length) return false;

            const hasAvailableRooms = hotelRooms.some(
                (room) =>
                    room.isAvailable &&
                    RoomService.isRoomAvailable(room.id ?? "", checkIn, checkOut),
            );

            return hasAvailableRooms;
        });
    }

    static createHotel(hotel: IHotel): Promise<IHotel> {
        return new Promise(async (resolve, reject) => {
            const existedHotel = hotels.some(
                (item) => item.name.toLowerCase() === hotel.name.toLowerCase(),
            );

            if (existedHotel) {
                reject("Este hotel ya existe");
                return;
            }

            if (hotel.stars && hotel.stars > 5) {
                reject("Solo se permiten 5 estrellas como máximo");
                return;
            }

            const id = crypto.randomUUID();
            const imageUrl = (await useRandomHotelImage()) as string;
            const newHotel: IHotel = {
                ...hotel,
                id,
                stars: hotel.stars || 0,
                imageUrl,
            };

            hotels.push(newHotel);
            resolve(newHotel);
        });
    }

    static updateHotelById(hotelId: string, hotel: IHotel): Promise<IHotel> {
        return new Promise((resolve, reject) => {
            const hotelFound = hotels.find((item) => item.id === hotelId);

            if (!hotelFound) {
                reject("No se encuentra el hotel");
                return;
            }

            const hotelIndex = hotels.findIndex((item) => item.id === hotelId);

            hotels[hotelIndex] = {
                ...hotelFound,
                ...hotel,
            };

            resolve(hotels[hotelIndex]);
        });
    }

    static deleteHotelById(hotelId: string): Promise<IHotel> {
        return new Promise((resolve, reject) => {
            const hotelFound = hotels.find((item) => item.id === hotelId);

            if (!hotelFound) {
                reject("No se encuentra el hotel");
                return;
            }

            const hotelIndex = hotels.findIndex((item) => item.id === hotelId);

            hotels.splice(hotelIndex, 1);

            resolve(hotelFound);
        });
    }
}
