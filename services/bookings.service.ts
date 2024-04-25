import connectDB from "@/lib/mongo";
import { Gender, IBooking, IBookingDetail } from "@/types";
import { getHotelById } from "./hotel.service";
import { getRoomById } from "./room.service";
import { findOneUser } from "./user.service";
import bookingModel from "@/models/booking.model";

export function getBookings(): Promise<IBooking[]> {
    connectDB();
    bookingModel.find();
    return new Promise(async (resolve, reject) => {
        try {
            const bookings = bookingModel.find().lean<IBooking[]>();
            resolve(bookings);
        } catch (error) {
            reject(error);
        }
    });
}

export function getBookingDetail(id: string): Promise<IBookingDetail> {
    return new Promise(async (resolve, reject) => {
        try {
            const booking = await bookingModel.findById(id).lean<IBooking>();

            if (!booking) {
                reject("No se encuentra la reserva");
                return;
            }

            const room = await getRoomById(booking.roomId);
            const hotel = await getHotelById(room.hotelId);
            const user = await findOneUser(booking.userId);

            resolve({
                ...booking,
                user,
                room,
                hotel,
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function getBookingsByUserId(userId: string): Promise<IBooking[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const bookingsData = await bookingModel.find({ userId }).lean<IBooking[]>();

            if (!bookingsData.length) {
                reject("No se encuentran reservas para este usuario");
                return;
            }

            resolve(bookingsData);
        } catch (error) {
            reject(error);
        }
    });
}

export function createBooking(booking: IBooking): Promise<IBooking> {
    return new Promise(async (resolve, reject) => {
        try {
            const newBooking = await bookingModel.create(booking);

            resolve(newBooking);
        } catch (error) {
            reject(error);
        }
    });
}
