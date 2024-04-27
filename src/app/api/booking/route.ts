import { createBooking, getBookings, getBookingsByUserId } from "@services/bookings.service";
import { findOneUser } from "@services/user.service";
import { generateTemplate } from "@/helpers/util";
import nodemailer from "nodemailer";
import { IBooking } from "@/types";

export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const userId = params.get("userId");

        if (userId) {
            const bookings = await getBookingsByUserId(userId);
            return Response.json(bookings, { status: 200 });
        }

        const bookings = await getBookings();
        return Response.json(bookings, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        const newBooking = (await request.json()) as IBooking;
        const booking = await createBooking(newBooking);
        const user = await findOneUser(booking.userId);

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
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
