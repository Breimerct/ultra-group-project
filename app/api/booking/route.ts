import { BookingService } from "@services/bookings.service";
import { UserService } from "@services/user.service";
import { generateTemplate } from "@/helpers/util";
import nodemailer from "nodemailer";
import { IBooking } from "@/types";

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const userId = params.get("userId");

        if (userId) {
            const bookings = await BookingService.getBookingsByUserId(userId);
            return Response.json(bookings, { status: 200 });
        }

        const bookings = await BookingService.getBookings();
        return Response.json(bookings, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function POST(request: Request) {
    try {
        const newBooking = (await request.json()) as IBooking;
        const booking = await BookingService.createBooking(newBooking);
        const user = await UserService.findOne(booking.userId);

        console.log(
            "Booking created",
            generateTemplate({
                name: user.name,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
            }),
        );

        nodemailer.createTestAccount((err: any, account: any) => {
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            let mailOptions = {
                from: '"Fred Foo 👻"',
                to: user.email,
                text: "Hello world?",
                html: generateTemplate({
                    name: user.name,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                }),
            };

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            });
        });

        return Response.json(booking, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
