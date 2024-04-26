import { IRoom } from "@/types";
import { getAvailableRoomsForHotelAndDate, getRoomsByHotelId } from "@services/room.service";

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        const hotelId = params.get("hotelId");
        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");

        let rooms: IRoom[] = [];

        if (!hotelId && (!checkIn || !checkOut)) {
            throw "el id del hotel es requerida";
        }

        if (!hotelId && (checkIn || checkOut)) {
            throw "el id del hotel es requerido";
        }

        if (hotelId && (!checkIn || !checkOut)) {
            rooms = await getRoomsByHotelId(hotelId);
        }

        if (hotelId && !!checkIn && !!checkOut) {
            rooms = await getAvailableRoomsForHotelAndDate(hotelId, checkIn, checkOut);
        }

        return Response.json(rooms, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
