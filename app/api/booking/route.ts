import { BookingService, IBooking } from "./bookings.service";

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
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function POST(request: Request) {
    try {
        const newBooking = (await request.json()) as IBooking;
        const booking = await BookingService.createBooking(newBooking);
        return Response.json(booking, { status: 200 });
    } catch (error: any) {
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
