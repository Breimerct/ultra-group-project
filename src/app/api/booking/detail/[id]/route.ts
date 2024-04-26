import { getBookingDetail } from "@services/bookings.service";

export async function GET(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const booking = await getBookingDetail(id);

        return Response.json(booking, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
