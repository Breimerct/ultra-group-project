import { AuthService, Gender, IUser } from "../auth/auth.service";
import { HotelService, IHotel } from "../hotel/hotel.service";
import { IRoom, RoomService } from "../room/room.service";

export interface IBooking {
    id?: string;
    checkIn: string;
    checkOut: string;
    roomId: string;
    userId: string;
    companions: ICompanion[];
    emergencyContact: IEmergencyContact;
}

export interface ICompanion {
    name: string;
    email: string;
    cellphone: string;
    documentType: string;
    documentNumber: string;
    gender: Gender | null;
}

export interface IEmergencyContact {
    name: string;
    cellphone: string;
}

export interface IBookingDetail extends IBooking {
    hotel: IHotel;
    room: IRoom;
}

export class BookingService {
    static bookings: IBooking[] = [
        {
            id: "1",
            checkIn: "2023-11-23",
            checkOut: "2023-11-25",
            roomId: "1",
            userId: "1",
            companions: [],
            emergencyContact: {
                name: "Emergency Contact",
                cellphone: "1234567890",
            },
        },
        {
            id: "2",
            checkIn: "2021-01-01",
            checkOut: "2021-01-05",
            roomId: "2",
            userId: "1",
            companions: [],
            emergencyContact: {
                name: "Emergency Contact",
                cellphone: "1234567890",
            },
        },
        {
            id: "3",
            checkIn: "2021-01-01",
            checkOut: "2021-01-05",
            roomId: "3",
            userId: "2",
            companions: [],
            emergencyContact: {
                name: "Emergency Contact",
                cellphone: "1234567890",
            },
        },
    ];

    static getBookings(): Promise<IBooking[]> {
        return new Promise((resolve) => {
            resolve(this.bookings);
        });
    }

    static getBooking(id: string): Promise<IBookingDetail> {
        return new Promise(async (resolve, reject) => {
            const booking = this.bookings.find((booking) => booking.id === id);

            if (!booking) {
                reject("No se encuentra la reserva");
                return;
            }

            const room = await RoomService.getRoomById(booking.roomId);
            const hotel = await HotelService.getHotelById(room.hotelId);

            resolve({
                ...booking,
                room,
                hotel,
            });
        });
    }

    static getBookingsByUserId(userId: string): Promise<IBooking[]> {
        return new Promise((resolve, reject) => {
            const bookings = this.bookings.filter((booking) => booking.userId === userId);

            if (!bookings.length) {
                reject("No se encuentran reservas para este usuario");
                return;
            }

            resolve(bookings);
        });
    }

    static createBooking(booking: IBooking): Promise<IBooking> {
        return new Promise((resolve) => {
            const newBooking = {
                ...booking,
                id: crypto.randomUUID(),
            };

            this.bookings.unshift(newBooking);

            resolve(newBooking);
        });
    }
}
