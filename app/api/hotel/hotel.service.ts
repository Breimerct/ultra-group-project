import useRandomHotelImage, { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { RoomService } from "../room/room.service";
import { ICity } from "../data/cities";
import CommonService from "../data/common.service";

export interface IHotel {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrl: string;
    cityId: number;
}

export interface IHotelResponse extends IHotel {
    city: ICity;
}

export class HotelService {
    static hotels: IHotel[] = [
        {
            id: "1",
            name: "Hotel 1",
            description: "Description 1",
            stars: 3,
            imageUrl: DEFAULT_IMAGE,
            cityId: 210,
        },
        {
            id: "2",
            name: "Hotel 2",
            description: "Description 2",
            stars: 4,
            imageUrl: DEFAULT_IMAGE,
            cityId: 144,
        },
        {
            id: "3",
            name: "Hotel 3",
            description: "Description 3",
            stars: 5,
            imageUrl: DEFAULT_IMAGE,
            cityId: 210,
        },
    ];

    static get getHotels(): Promise<IHotel[]> {
        return new Promise((resolve) => {
            const hotels = this.hotels.filter((hotel) => {
                const hotelRooms = RoomService.rooms.filter((room) => room.hotelId === hotel.id);

                if (!hotelRooms.length) return false;

                return true;
            });
            resolve(hotels);
        });
    }

    static getHotelById(hotelId: string): Promise<IHotelResponse> {
        return new Promise(async (resolve, reject) => {
            const hotelFound = this.hotels.find((hotel) => hotel.id === hotelId);

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
            const hotels = this.hotels.filter((hotel) => hotel.cityId === cityId);

            if (!hotels.length) {
                reject("No se encuentran hoteles para esta ciudad");
                return;
            }

            resolve(hotels);
        });
    }

    static filterHotelsByCityAndAvailability(cityId: number, checkIn: string, checkOut: string): IHotel[] {
        const hotels = this.hotels.filter((hotel) => hotel.cityId === cityId);

        return hotels.filter((hotel) => {
            const hotelRooms = RoomService.rooms.filter((room) => room.hotelId === hotel.id);

            if (!hotelRooms.length) return false;

            const hasAvailableRooms = hotelRooms.some((room) =>
                RoomService.isRoomAvailable(room.id ?? "", checkIn, checkOut),
            );

            return hasAvailableRooms;
        });
    }

    static createHotel(hotel: IHotel): Promise<IHotel> {
        return new Promise(async (resolve, reject) => {
            const existedHotel = this.hotels.some((item) => item.name.toLowerCase() === hotel.name.toLowerCase());

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

            this.hotels.push(newHotel);
            resolve(newHotel);
        });
    }
}
