import { HotelService, IHotel } from "./hotel.service";

export async function GET() {
    try {
        const hotels = await HotelService.getHotels();

        return Response.json(hotels, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error.message
                : error;
        const status =
            error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function POST(request: Request) {
    try {
        const newHotel = (await request.json()) as IHotel;

        const hotels = await HotelService.createHotel(newHotel);

        return Response.json(hotels, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error.message
                : error;
        const status =
            error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
