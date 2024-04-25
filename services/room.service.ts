import useRandomHotelImage from "@/hooks/useRandomImage/useRandomImage";
import { HotelService } from "./hotel.service";
import { BookingService } from "./bookings.service";
import { ICategoryRoom, IHotel, IRoom, IRoomDetail } from "@/types";
import connectDB from "@/lib/mongo";
import roomModel from "@/models/room.model";

export class RoomService {
    static get getActiveRooms(): Promise<IRoom[]> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const roomsData = roomModel.find({ isAvailable: true }).lean<IRoom[]>();

                return resolve(roomsData);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static createRoom(room: IRoom): Promise<IRoom> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const imageUrl: string[] = (await useRandomHotelImage(
                    true,
                    4,
                )) as string[];

                const newRoom = {
                    ...room,
                    imageUrls: imageUrl,
                };

                const roomCreated = await roomModel.create(newRoom);

                return resolve(roomCreated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static updateRoomById(id: string, room: IRoom): Promise<IRoom> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const roomFound = await roomModel.findById(id).lean<IRoom>();

                if (!roomFound) {
                    return reject("No se encuentra la habitación");
                }

                const newData = {
                    ...roomFound,
                    ...room,
                };

                const roomUpdated = await roomModel.findByIdAndUpdate(id, newData, {
                    new: true,
                });

                return resolve(roomUpdated);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static deleteRoomById(id: string): Promise<IRoom> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const roomFound = await roomModel.findById(id).lean<IRoom>();

                if (!roomFound) {
                    return reject("No se encuentra la habitación");
                }

                const roomDeleted = await roomModel.findByIdAndDelete(id);

                return resolve(roomDeleted);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static getRooms(): Promise<IRoomDetail[]> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const rooms = await roomModel
                    .find()
                    .populate("categoryId")
                    .lean<IRoomDetail[]>();

                const roomResponse = this.formatRooms(rooms);

                return resolve(roomResponse);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static getRoomById(id: string): Promise<IRoomDetail> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const roomData = await roomModel
                    .findById(id)
                    .populate("categoryId")
                    .lean<IRoomDetail>();

                if (!roomData) {
                    return reject("No se encuentra la habitación");
                }

                const category = roomData.categoryId as unknown as ICategoryRoom;

                const roomResponse = {
                    ...roomData,
                    category,
                    categoryId: category._id,
                };

                return resolve(roomResponse);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static getRoomsByHotelId(hotelId: string): Promise<IRoomDetail[]> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const roomsData = await roomModel
                    .find({ hotelId })
                    .populate("categoryId")
                    .lean<IRoomDetail[]>();

                if (!roomsData.length) {
                    reject("No se encuentran habitaciones para este hotel");
                    return;
                }

                const roomResponse = this.formatRooms(roomsData);

                return resolve(roomResponse);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static getAvailableRoomsForHotelAndDate(
        hotelId: string,
        checkIn: string,
        checkOut: string,
    ): Promise<IRoomDetail[]> {
        return new Promise(async (resolve, reject) => {
            connectDB();
            try {
                const hotels: IHotel[] = await HotelService.getHotels();
                let availableRooms = [];

                const hotel = hotels.find((h) => h._id?.toString() === hotelId);

                if (!hotel) {
                    return reject("No se encuentra el hotel");
                }

                console.log(hotel._id);

                const rooms = await roomModel
                    .find({
                        isAvailable: true,
                        hotelId: hotel._id?.toString(),
                    })
                    .populate("categoryId")
                    .lean<IRoomDetail[]>();

                for (let index = 0; index < rooms.length; index++) {
                    const { _id } = rooms[index];

                    if (!_id) return;

                    const validRoom = await this.isRoomAvailable(
                        _id?.toString(),
                        checkIn,
                        checkOut,
                    );

                    if (!!validRoom) {
                        availableRooms.push(rooms[index]);
                    }
                }

                availableRooms = this.formatRooms(availableRooms);

                return resolve(availableRooms);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async isRoomAvailable(
        roomId: string,
        checkIn: string,
        checkOut: string,
    ): Promise<boolean> {
        const roomBookings = (await BookingService.getBookings()).filter(
            (booking) => booking.roomId.toString() === roomId.toString(),
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

    private static formatRooms(rooms: any): IRoomDetail[] {
        return rooms.map((room: any) => ({
            ...room,
            category: room.categoryId as unknown as ICategoryRoom,
            categoryId: room?.categoryId?._id || "",
        }));
    }
}
