import useRandomHotelImage, { DEFAULT_IMAGE } from "@/hooks/useRandomImage/useRandomImage";
import { HotelService, IHotel } from "../hotel/hotel.service";
import { BookingService } from "../booking/bookings.service";

export interface IRoom {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrls: string[];
    hotelId: string;
    price?: number;
    isAvailable: boolean;
}

export class RoomService {
    static rooms: IRoom[] = [
        {
            id: "1",
            name: "Room 1",
            description: "Description 1",
            stars: 5,
            imageUrls: [
                "https://images.unsplash.com/photo-1671798747347-690f91e569b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MDkyNjZ8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1518537708190-1e8c9c61ea9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1625332787231-31effa85c454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1602582401490-7bef59dfe400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjMwMzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDA2MTMwOTV8&ixlib=rb-4.0.3&q=80&w=1080",
            ],
            hotelId: "1",
            isAvailable: true,
            price: 100,
        },
        {
            id: "2",
            name: "Room 2",
            description: "Description 2",
            stars: 4,
            imageUrls: [DEFAULT_IMAGE],
            hotelId: "2",
            isAvailable: true,
            price: 200,
        },
        {
            id: "3",
            name: "Room 3",
            description: "Description 3",
            stars: 5,
            imageUrls: [DEFAULT_IMAGE],
            hotelId: "1",
            isAvailable: false,
            price: 300,
        },
    ];

    static get getActiveRooms(): Promise<IRoom[]> {
        return new Promise((resolve) => {
            const rooms = this.rooms.filter((room) => room.isAvailable);

            resolve(rooms);
        });
    }

    static createRoom(room: IRoom): Promise<IRoom> {
        return new Promise(async (resolve) => {
            const imageUrl: string[] = (await useRandomHotelImage(true, 3)) as string[];

            console.log(imageUrl);

            this.rooms.push({
                ...room,
                imageUrls: imageUrl,
            });
            resolve(room);
        });
    }

    static updateRoomById(id: string, room: IRoom): Promise<IRoom> {
        return new Promise(async (resolve, reject) => {
            const roomFound = this.rooms.find((room) => room.id === id);

            if (!roomFound) {
                reject("No se encuentra la habitación");
                return;
            }

            const roomIndex = this.rooms.findIndex((room) => room.id === id);

            this.rooms[roomIndex] = {
                ...roomFound,
                ...room,
            };

            resolve(this.rooms[roomIndex]);
        });
    }

    static deleteRoomById(id: string): Promise<IRoom> {
        return new Promise(async (resolve, reject) => {
            const roomFound = this.rooms.find((room) => room.id === id);

            if (!roomFound) {
                reject("No se encuentra la habitación");
                return;
            }

            const roomIndex = this.rooms.findIndex((room) => room.id === id);

            this.rooms.splice(roomIndex, 1);

            resolve(roomFound);
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
            const rooms = this.rooms.filter((room) => room.hotelId === hotelId && room.isAvailable);

            if (!rooms.length) {
                reject("No se encuentran habitaciones para este hotel");
                return;
            }

            resolve(rooms);
        });
    }

    static getAvailableRoomsForHotelAndDate(hotelId: string, checkIn: string, checkOut: string): Promise<IRoom[]> {
        return new Promise((resolve, reject) => {
            const hotels: IHotel[] = HotelService.hotels;
            let availableRooms: IRoom[] = [];

            const hotel = hotels.find((h) => h.id === hotelId);

            if (!hotel) {
                reject("No se encuentra el hotel");
                return;
            }
            availableRooms = this.rooms
                .filter((room) => room.isAvailable)
                .filter((room) => room.hotelId === hotel.id)
                .filter((room) => this.isRoomAvailable(room?.id ?? "", checkIn, checkOut));

            resolve(availableRooms);
        });
    }

    static isRoomAvailable(roomId: string, checkIn: string, checkOut: string): boolean {
        const roomBookings = BookingService.bookings.filter((booking) => booking.roomId === roomId);

        for (const booking of roomBookings) {
            const bookingCheckIn = new Date(booking.checkIn);
            const bookingCheckOut = new Date(booking.checkOut);
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);

            if (
                (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
                (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
                (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
            ) {
                return false;
            }
        }

        return true;
    }
}
