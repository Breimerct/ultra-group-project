import { IHotel } from "@/types";
import {
    createHotel,
    filterHotelsByCityAndAvailability,
    getActiveHotels,
    getHotelsByCityId,
} from "@services/hotel.service";

export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const cityId = Number(params.get("cityId"));
        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");
        let hotels: IHotel[] = [];

        if (!cityId && !checkIn && !checkOut) {
            hotels = await getActiveHotels();
        }

        if ((checkOut || checkIn) && !cityId) {
            throw "Falta el parametro cityId";
        }

        if (cityId && (!checkIn || !checkOut)) {
            hotels = await getHotelsByCityId(cityId);
        }

        if (cityId && checkIn && checkOut) {
            hotels = await filterHotelsByCityAndAvailability(cityId, checkIn, checkOut);
        }

        return Response.json(hotels, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        const newHotel = (await request.json()) as IHotel;

        const hotels = await createHotel(newHotel);

        return Response.json(hotels, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
