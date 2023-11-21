import { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { HotelService, IHotel } from "../hotel/hotel.service";
import { BookingService, IBooking } from "../bookings/bookings.service";

export interface IRoom {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrl: string;
    hotelId: string;
}

export class RoomService {
    static rooms: IRoom[] = [
        {
            id: "1",
            name: "Room 1",
            description: "Description 1",
            stars: 3,
            imageUrl: DEFAULT_IMAGE,
            hotelId: "1",
        },
        {
            id: "2",
            name: "Room 2",
            description: "Description 2",
            stars: 4,
            imageUrl: DEFAULT_IMAGE,
            hotelId: "1",
        },
        {
            id: "3",
            name: "Room 3",
            description: "Description 3",
            stars: 5,
            imageUrl: DEFAULT_IMAGE,
            hotelId: "1",
        },
    ];

    static getRooms(): Promise<IRoom[]> {
        return new Promise((resolve) => {
            resolve(this.rooms);
        });
    }

    static getRoomsByHotelId(hotelId: string): Promise<IRoom[]> {
        return new Promise((resolve, reject) => {
            const rooms = this.rooms.filter((room) => room.hotelId === hotelId);

            if (!rooms.length) {
                reject("No se encuentran habitaciones para este hotel");
                return;
            }

            resolve(rooms);
        });
    }

    static getAvailableRoomsForHotelAndDate(
        hotelId: string,
        checkDate: string,
    ): Promise<IRoom[]> {
        return new Promise((resolve, reject) => {
            const hotels: IHotel[] = HotelService.hotels;
            const bookings: IBooking[] = BookingService.bookings;
            let availableRooms: IRoom[] = [];

            const hotel = hotels.find((h) => h.id === hotelId);

            if (!hotel) {
                reject("No se encuentra el hotel");
                return;
            }

            const reservationsOnDate: string[] = bookings
                .filter(
                    (booking) =>
                        new Date(booking.checkIn) <= new Date(checkDate) &&
                        new Date(booking.checkOut) >= new Date(checkDate),
                )
                .map((booking) => booking.roomId);

            availableRooms = this.rooms
                .filter((room) => room.hotelId === hotel.id)
                .filter((room) => !reservationsOnDate.includes(room.id || ""));

            resolve(availableRooms);
        });
    }
}
