import { HotelService, IHotel } from "../../../services/hotel.service";

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const cityId = Number(params.get("cityId"));
        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");
        let hotels: IHotel[] = [];

        if (!cityId && !checkIn && !checkOut) {
            hotels = await HotelService.getActiveHotels;
        }

        if ((checkOut || checkIn) && !cityId) {
            throw "Falta el parametro cityId";
        }

        if (cityId && (!checkIn || !checkOut)) {
            hotels = await HotelService.getHotelsByCityId(cityId);
        }

        if (cityId && checkIn && checkOut) {
            hotels = HotelService.filterHotelsByCityAndAvailability(
                cityId,
                checkIn,
                checkOut,
            );
        }

        return Response.json(hotels, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

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
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
