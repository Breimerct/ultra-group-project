import { IRoom, RoomService } from "../room.service";

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

        if ((checkIn || checkOut) && !hotelId) {
            throw "el id del hotel es requerido";
        }

        if (hotelId && (!checkIn || !checkOut)) {
            rooms = await RoomService.getRoomsByHotelId(hotelId);
        }

        if (hotelId && !!checkIn && !!checkOut) {
            rooms = await RoomService.getAvailableRoomsForHotelAndDate(hotelId, checkIn, checkOut);
        }

        return Response.json(rooms, { status: 200 });
    } catch (error: any) {
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
