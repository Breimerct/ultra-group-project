import useRandomHotelImage, {
    DEFAULT_IMAGE,
} from "@/hooks/useRandomImage/useRandomImage";
import { HotelService, IHotel } from "../hotel/hotel.service";
import { BookingService } from "../booking/bookings.service";
import CommonService, { ICategoryRoom } from "../data/common.service";

export interface IRoom {
    id?: string;
    name: string;
    description?: string | null;
    stars?: number;
    imageUrls: string[];
    hotelId: string;
    categoryId: string;
    price?: number;
    isAvailable: boolean;
}

export interface IRoomDetail extends IRoom {
    category: ICategoryRoom;
}

const rooms: IRoom[] = [
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
        categoryId: "1",
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
        categoryId: "1",
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
        categoryId: "2",
        isAvailable: false,
        price: 300,
    },
];

export class RoomService {
    static get getActiveRooms(): Promise<IRoom[]> {
        return new Promise((resolve) => {
            const roomsData = rooms.filter((room) => room.isAvailable);

            resolve(roomsData);
        });
    }

    static createRoom(room: IRoom): Promise<IRoom> {
        return new Promise(async (resolve) => {
            const imageUrl: string[] = (await useRandomHotelImage(true, 3)) as string[];

            console.log(imageUrl);

            rooms.push({
                ...room,
                imageUrls: imageUrl,
            });
            resolve(room);
        });
    }

    static updateRoomById(id: string, room: IRoom): Promise<IRoom> {
        return new Promise(async (resolve, reject) => {
            const roomFound = rooms.find((room) => room.id === id);

            if (!roomFound) {
                reject("No se encuentra la habitación");
                return;
            }

            const roomIndex = rooms.findIndex((room) => room.id === id);

            rooms[roomIndex] = {
                ...roomFound,
                ...room,
            };

            resolve(rooms[roomIndex]);
        });
    }

    static deleteRoomById(id: string): Promise<IRoom> {
        return new Promise(async (resolve, reject) => {
            const roomFound = rooms.find((room) => room.id === id);

            if (!roomFound) {
                reject("No se encuentra la habitación");
                return;
            }

            const roomIndex = rooms.findIndex((room) => room.id === id);

            rooms.splice(roomIndex, 1);

            resolve(roomFound);
        });
    }

    static getRooms(): Promise<IRoomDetail[]> {
        return new Promise((resolve) => {
            Promise.all(
                rooms.map(async (room) => {
                    const category = await CommonService.getCategoryById(
                        room.categoryId ?? "",
                    );

                    return {
                        ...room,
                        category,
                    };
                }),
            ).then((roomsData) => {
                resolve(roomsData);
            });
        });
    }

    static getRoomById(id: string): Promise<IRoomDetail> {
        return new Promise(async (resolve, reject) => {
            const roomData = rooms.find((room) => room.id === id);

            if (!roomData) {
                reject("No se encuentra la habitación");
                return;
            }

            const category = await CommonService.getCategoryById(
                roomData.categoryId ?? "",
            );

            resolve({
                ...roomData,
                category,
            });
        });
    }

    static getRoomsByHotelId(hotelId: string): Promise<IRoomDetail[]> {
        return new Promise((resolve, reject) => {
            const roomsData = rooms.filter(
                (room) => room.hotelId === hotelId && room.isAvailable,
            );

            if (!roomsData.length) {
                reject("No se encuentran habitaciones para este hotel");
                return;
            }

            Promise.all(
                roomsData.map(async (room) => {
                    const category = await CommonService.getCategoryById(
                        room.categoryId ?? "",
                    );

                    return {
                        ...room,
                        category,
                    };
                }),
            ).then((rooms) => {
                resolve(rooms);
            });
        });
    }

    static getAvailableRoomsForHotelAndDate(
        hotelId: string,
        checkIn: string,
        checkOut: string,
    ): Promise<IRoom[]> {
        return new Promise(async (resolve, reject) => {
            const hotels: IHotel[] = await HotelService.getHotels();
            let availableRooms: IRoom[] = [];

            const hotel = hotels.find((h) => h.id === hotelId);

            if (!hotel) {
                reject("No se encuentra el hotel");
                return;
            }
            availableRooms = rooms
                .filter((room) => room.isAvailable)
                .filter((room) => room.hotelId === hotel.id)
                .filter((room) =>
                    this.isRoomAvailable(room?.id ?? "", checkIn, checkOut),
                );

            resolve(availableRooms);
        });
    }

    static async isRoomAvailable(
        roomId: string,
        checkIn: string,
        checkOut: string,
    ): Promise<boolean> {
        const roomBookings = (await BookingService.getBookings()).filter(
            (booking) => booking.roomId === roomId,
        );

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
