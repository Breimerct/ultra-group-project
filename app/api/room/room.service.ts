import useRandomHotelImage, {
    DEFAULT_IMAGE,
} from "@/hooks/useRandomImage/useRandomImage";
import { HotelService, IHotel } from "../hotel/hotel.service";
import { BookingService, IBooking } from "../bookings/bookings.service";
let images = [""];

export interface IRoom {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrls: string[];
    hotelId: string;
    price?: number;
    isAvailable?: boolean;
}

export class RoomService {
    static rooms: IRoom[] = [
        {
            id: "1",
            name: "Room 1",
            description: "Description 1",
            stars: 3,
            imageUrls: [
                "https://images.unsplash.com/photo-1671798747347-690f91e569b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MDkyNjZ8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1518537708190-1e8c9c61ea9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1625332787231-31effa85c454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1602582401490-7bef59dfe400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
            ],
            hotelId: "1",
        },
        {
            id: "2",
            name: "Room 2",
            description: "Description 2",
            stars: 4,
            imageUrls: [DEFAULT_IMAGE],
            hotelId: "1",
        },
        {
            id: "3",
            name: "Room 3",
            description: "Description 3",
            stars: 5,
            imageUrls: [DEFAULT_IMAGE],
            hotelId: "1",
        },
    ];

    static createRoom(room: IRoom): Promise<IRoom> {
        return new Promise(async (resolve) => {
            const imageUrl: string[] = (await useRandomHotelImage(
                true,
                Math.random() * (3 - 1) + 1,
            )) as string[];

            this.rooms.push({
                ...room,
                imageUrls: imageUrl,
            });
            resolve(room);
        });
    }

    static updateRoom(room: IRoom): Promise<IRoom> {
        return new Promise((resolve) => {
            const index = this.rooms.findIndex((r) => r.id === room.id);

            this.rooms[index] = room;

            resolve(room);
        });
    }

    static getRooms(): Promise<IRoom[]> {
        return new Promise((resolve) => {
            resolve(this.rooms);
        });
    }

    static getRoomById(id: string): Promise<IRoom> {
        return new Promise((resolve, reject) => {
            const room = this.rooms.find((room) => room.id === id);

            if (!room) {
                reject("No se encuentra la habitación");
                return;
            }

            resolve(room);
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
