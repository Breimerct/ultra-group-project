import useRandomHotelImage, {
    DEFAULT_IMAGE,
} from "@/hooks/useRandomImage/useRandomImage";
import { IRoom, RoomService } from "../room/room.service";
import { BookingService, IBooking } from "../bookings/bookings.service";

export interface IHotel {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrl: string;
    cityId: number;
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

    static getHotels(): Promise<IHotel[]> {
        return new Promise((resolve) => {
            resolve(this.hotels);
        });
    }

    static getHotelById(hotelId: string): Promise<IHotel> {
        return new Promise((resolve, reject) => {
            const hotel = this.hotels.find((hotel) => hotel.id === hotelId);

            if (!hotel) {
                reject("No se encuentra el hotel");
                return;
            }

            resolve(hotel);
        });
    }

    static getHotelsByCityId(cityId: number): Promise<IHotel[]> {
        return new Promise((resolve, reject) => {
            const hotels = this.hotels.filter(
                (hotel) => hotel.cityId === cityId,
            );

            if (!hotels.length) {
                reject("No se encuentran hoteles para esta ciudad");
                return;
            }

            resolve(hotels);
        });
    }

    static filterHotelsByCityAndDate(
        cityId: number,
        checkDate: string,
    ): Promise<IHotel[]> {
        return new Promise((resolve, reject) => {
            const rooms: IRoom[] = RoomService.rooms;
            const bookings: IBooking[] = BookingService.bookings;

            const filteredHotels = this.hotels.filter(
                (hotel) => hotel.cityId === cityId,
            );

            if (!filteredHotels.length) {
                reject("No se encuentran hoteles para esta ciudad");
                return;
            }

            const reservationsOnDate: string[] = bookings
                .filter(
                    (booking) =>
                        new Date(booking.checkIn) <= new Date(checkDate) &&
                        new Date(booking.checkOut) >= new Date(checkDate),
                )
                .map((booking) => booking.roomId);

            const availableHotels = filteredHotels.filter((hotel) => {
                const hotelRooms = rooms.filter(
                    (room) => room.hotelId === hotel.id,
                );
                return hotelRooms.some(
                    (room) => !reservationsOnDate.includes(room.id || ""),
                );
            });

            resolve(availableHotels);
        });
    }

    static createHotel(hotel: IHotel): Promise<IHotel> {
        return new Promise(async (resolve, reject) => {
            const existedHotel = this.hotels.some(
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

            this.hotels.push(newHotel);
            resolve(newHotel);
        });
    }
}
