import connectDB from "@/lib/mongo";
import { Gender, IBooking, IBookingDetail } from "@/types";
import { HotelService } from "./hotel.service";
import { RoomService } from "./room.service";
import { UserService } from "./user.service";
import bookingModel from "@/models/booking.model";

export class BookingService {
    static getBookings(): Promise<IBooking[]> {
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

    static getBookingDetail(id: string): Promise<IBookingDetail> {
        return new Promise(async (resolve, reject) => {
            try {
                const booking = await bookingModel.findById(id).lean<IBooking>();

                if (!booking) {
                    reject("No se encuentra la reserva");
                    return;
                }

                const room = await RoomService.getRoomById(booking.roomId);
                const hotel = await HotelService.getHotelById(room.hotelId);
                const user = await UserService.findOne(booking.userId);

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

    static getBookingsByUserId(userId: string): Promise<IBooking[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const bookingsData = await bookingModel
                    .find({ userId })
                    .lean<IBooking[]>();

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

    static createBooking(booking: IBooking): Promise<IBooking> {
        return new Promise(async (resolve, reject) => {
            try {
                const newBooking = await bookingModel.create(booking);

                resolve(newBooking);
            } catch (error) {
                reject(error);
            }
        });
    }
}
