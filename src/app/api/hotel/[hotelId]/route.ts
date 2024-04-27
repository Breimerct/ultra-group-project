import { deleteHotelById, getHotelById, updateHotelById } from "@services/hotel.service";

export const revalidate = 0;

export async function GET(request: Request, response: { params: { hotelId: string } }) {
    try {
        const { hotelId } = response.params;

        const hotel = await getHotelById(hotelId);

        return Response.json(hotel, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function PUT(request: Request, response: { params: { hotelId: string } }) {
    try {
        const { hotelId } = response.params;
        const body = await request.json();

        const hotel = await updateHotelById(hotelId, body);

        return Response.json(hotel, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function DELETE(request: Request, response: { params: { hotelId: string } }) {
    try {
        const { hotelId } = response.params;

        const hotel = await deleteHotelById(hotelId);

        return Response.json(hotel, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
