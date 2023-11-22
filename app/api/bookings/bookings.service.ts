import { IUser } from "../auth/auth.service";

export interface IBooking {
    id?: string;
    checkIn: string;
    checkOut: string;
    roomId: string;
    userId: string;
    companions: IUser[];
    emergencyContact: IEmergencyContact;
}

export interface IEmergencyContact {
    name: string;
    cellphone: string;
}

export class BookingService {
    static bookings: IBooking[] = [
        {
            id: "1",
            checkIn: "2021-01-01",
            checkOut: "2023-11-21",
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
            userId: "1",
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
