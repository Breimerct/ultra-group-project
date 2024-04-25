import { deleteHotelById, getHotelById, updateHotelById } from "@services/hotel.service";

export async function GET(request: Request, response: { params: { hotelId: string } }) {
    try {
        const { hotelId } = response.params;

        const hotel = await getHotelById(hotelId);

        return Response.json(hotel, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function PUT(request: Request, response: { params: { hotelId: string } }) {
    try {
        const { hotelId } = response.params;
        const body = await request.json();

        const hotel = await updateHotelById(hotelId, body);

        return Response.json(hotel, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function DELETE(
    request: Request,
    response: { params: { hotelId: string } },
) {
    try {
        const { hotelId } = response.params;

        const hotel = await deleteHotelById(hotelId);

        return Response.json(hotel, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
