import { BookingService, IBooking } from "./bookings.service";

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
