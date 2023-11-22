import { HotelService, IHotel } from "./hotel.service";

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const cityId = Number(params.get("cityId"));
        const checkDate = params.get("checkDate");
        let hotels: IHotel[] = [];

        if (!cityId && !checkDate) {
            hotels = await HotelService.getHotels();
        }

        if (checkDate && !cityId) {
            throw "Falta el parametro cityId";
        }

        if (cityId && !checkDate) {
            hotels = await HotelService.getHotelsByCityId(cityId);
        }

        if (cityId && checkDate) {
            hotels = await HotelService.filterHotelsByCityAndDate(cityId, checkDate);
        }

        return Response.json(hotels, { status: 200 });
    } catch (error: any) {
        const message = error instanceof Error || error instanceof Object ? error.message : error;
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
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
