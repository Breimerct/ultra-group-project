import generateRandomImages from "@/hooks/useRandomImage/useRandomImage";
import { getHotels } from "./hotel.service";
import { getBookings } from "./bookings.service";
import { ICategoryRoom, IHotel, IRoom, IRoomDetail } from "@/types";
import roomModel from "@/models/room.model";
import { validateMongoId } from "@/helpers/util";
import connectDB from "@/lib/mongo";

export async function getActiveRooms(): Promise<IRoom[]> {
    await connectDB();

    const roomsData = roomModel.find({ isAvailable: true });

    return roomsData;
}

export async function createRoom(room: IRoom): Promise<IRoom> {
    await connectDB();

    const imageUrl = await generateRandomImages(true, 4);

    const newRoom = {
        ...room,
        imageUrls: imageUrl,
    };

    const roomCreated = await roomModel.create(newRoom);

    return roomCreated;
}

export async function updateRoomById(id: string, room: IRoom): Promise<IRoom> {
    await Promise.all([connectDB(), validateMongoId(id)]);

    const roomFound = await roomModel.findById(id).lean<IRoom>();

    if (!roomFound) {
        throw new Error("No se encuentra la habitación");
    }

    const newData = {
        ...roomFound,
        ...room,
    };

    const roomUpdated = await roomModel.findByIdAndUpdate(id, newData, {
        new: true,
    });

    return roomUpdated;
}

export async function deleteRoomById(id: string): Promise<IRoom> {
    await Promise.all([connectDB(), validateMongoId(id)]);

    const roomFound = await roomModel.findById(id).lean<IRoom>();

    if (!roomFound) {
        throw new Error("No se encuentra la habitación");
    }

    const roomDeleted = await roomModel.findByIdAndDelete(id);

    return roomDeleted;
}

export async function getRooms(): Promise<IRoomDetail[]> {
    await connectDB();

    const rooms = await roomModel.find().populate("categoryId").lean<IRoomDetail[]>();
    const roomResponse = formatRooms(rooms);

    return roomResponse;
}

export async function getRoomById(id: string): Promise<IRoomDetail> {
    await Promise.all([connectDB(), validateMongoId(id)]);

    const roomData = await roomModel.findById(id).populate("categoryId").lean<IRoomDetail>();

    if (!roomData) {
        throw new Error("No se encuentra la habitación");
    }

    const category = roomData.categoryId as unknown as ICategoryRoom;

    const roomResponse = {
        ...roomData,
        category,
        categoryId: category._id,
    };

    return roomResponse;
}

export async function getRoomsByHotelId(hotelId: string): Promise<IRoomDetail[]> {
    await Promise.all([connectDB(), validateMongoId(hotelId)]);

    const roomsData = await roomModel
        .find({ hotelId, isAvailable: true })
        .populate("categoryId")
        .lean<IRoomDetail[]>();

    if (!roomsData.length) {
        throw new Error("No se encuentran habitaciones para este hotel");
    }

    const roomResponse = formatRooms(roomsData);

    return roomResponse;
}

export async function getAvailableRoomsForHotelAndDate(
    hotelId: string,
    checkIn: string,
    checkOut: string,
): Promise<IRoomDetail[]> {
    await validateMongoId(hotelId);

    const hotels: IHotel[] = await getHotels();
    let availableRooms = [];

    const hotel = hotels.find((h) => h._id?.toString() === hotelId);

    if (!hotel) {
        throw new Error("No se encuentra el hotel");
    }

    const rooms = await roomModel
        .find({
            isAvailable: true,
            hotelId: hotel._id?.toString(),
        })
        .populate("categoryId")
        .lean<IRoomDetail[]>();

    for (let index = 0; index < rooms.length; index++) {
        const { _id } = rooms[index];

        if (_id) {
            const validRoom = await isRoomAvailable(_id?.toString(), checkIn, checkOut);

            if (!!validRoom) {
                availableRooms.push(rooms[index]);
            }
        }
    }

    availableRooms = formatRooms(availableRooms);

    return availableRooms;
}

export async function isRoomAvailable(
    roomId: string,
    checkIn: string,
    checkOut: string,
): Promise<boolean> {
    const roomBookings = (await getBookings()).filter(
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

function formatRooms(rooms: any): IRoomDetail[] {
    return rooms.map((room: any) => ({
        ...room,
        category: room.categoryId as unknown as ICategoryRoom,
        categoryId: room?.categoryId?._id,
    }));
}
