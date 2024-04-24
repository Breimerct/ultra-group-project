import { HotelService, IHotelResponse } from "./hotel.service";
import { IRoom, RoomService } from "./room.service";
import { Gender, IUser, UserService } from "./user.service";

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
    hotel: IHotelResponse;
    room: IRoom;
    user: IUser;
}

const bookings: IBooking[] = [
    {
        id: "1",
        checkIn: "2023-11-23",
        checkOut: "2023-11-25",
        roomId: "1",
        userId: "1",
        companions: [
            {
                name: "Companion 1",
                email: "test1@test.com",
                cellphone: "1234567890",
                documentType: "CC",
                documentNumber: "1234567890",
                gender: Gender.Female,
            },
        ],
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
        companions: [
            {
                name: "Companion 1",
                email: "test2@test.com",
                cellphone: "1234567890",
                documentType: "TI",
                documentNumber: "1234567890",
                gender: Gender.Male,
            },
        ],
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
        companions: [
            {
                name: "Companion 1",
                email: "test2@test.com",
                cellphone: "1234567890",
                documentType: "DNI",
                documentNumber: "1234567890",
                gender: Gender.Male,
            },
        ],
        emergencyContact: {
            name: "Emergency Contact",
            cellphone: "1234567890",
        },
    },
];

export class BookingService {
    static getBookings(): Promise<IBooking[]> {
        return new Promise((resolve) => {
            resolve(bookings);
        });
    }

    static getBookingDetail(id: string): Promise<IBookingDetail> {
        return new Promise(async (resolve, reject) => {
            const booking = bookings.find((booking) => booking.id === id);

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
        });
    }

    static getBookingsByUserId(userId: string): Promise<IBooking[]> {
        return new Promise((resolve, reject) => {
            const bookingsData = bookings.filter((booking) => booking.userId === userId);

            if (!bookingsData.length) {
                reject("No se encuentran reservas para este usuario");
                return;
            }

            resolve(bookingsData);
        });
    }

    static createBooking(booking: IBooking): Promise<IBooking> {
        return new Promise((resolve) => {
            const newBooking = {
                ...booking,
                id: crypto.randomUUID(),
            };

            bookings.push(newBooking);

            resolve(newBooking);
        });
    }
}
