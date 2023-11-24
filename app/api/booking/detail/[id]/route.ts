import { BookingService } from "../../bookings.service";

export async function GET(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const booking = await BookingService.getBookingDetail(id);

        return Response.json(booking, { status: 200 });
    } catch (error: any) {
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
