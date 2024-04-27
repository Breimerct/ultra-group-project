import { IBooking, IBookingDetail } from "@/types";
import { getHotelById } from "./hotel.service";
import { getRoomById } from "./room.service";
import { findOneUser } from "./user.service";
import bookingModel from "@/models/booking.model";
import { validateMongoId } from "@/helpers/util";
import connectDB from "@/lib/mongo";

export async function getBookings(): Promise<IBooking[]> {
    await connectDB();

    const bookings = await bookingModel.find().lean<IBooking[]>();

    return bookings;
}

export async function getBookingDetail(id: string): Promise<IBookingDetail> {
    await validateMongoId(id);
    const booking = await bookingModel.findById(id).lean<IBooking>();

    if (!booking) {
        throw new Error("No se encuentra la reserva");
    }

    const room = await getRoomById(booking.roomId);
    const hotel = await getHotelById(room.hotelId);
    const user = await findOneUser(booking.userId);

    return {
        ...booking,
        user,
        room,
        hotel,
    };
}

export async function getBookingsByUserId(userId: string): Promise<IBooking[]> {
    await Promise.all([validateMongoId(userId), connectDB()]);

    const bookingsData = await bookingModel.find({ userId }).lean<IBooking[]>();

    if (!bookingsData.length) {
        throw new Error("No se encuentran reservas para este usuario");
    }

    return bookingsData;
}

export async function createBooking(booking: IBooking): Promise<IBooking> {
    await connectDB();

    const newBooking = await bookingModel.create(booking);

    return newBooking;
}
