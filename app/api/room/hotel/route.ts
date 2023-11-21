import { IRoom, RoomService } from "../room.service";

export async function GET(request: Request) {
    try {
        const params = new URL(request.url).searchParams;
        console.log(params);
        const hotelId = params.get("hotelId");
        const checkDate = params.get("checkDate");
        let rooms: IRoom[] = [];

        if (!hotelId && !checkDate) {
            throw "el id del hotel es requerida";
        }

        if (checkDate && !hotelId) {
            throw "el id del hotel es requerido";
        }

        if (hotelId && !checkDate) {
            rooms = await RoomService.getRoomsByHotelId(hotelId);
        }

        if (hotelId && checkDate) {
            rooms = await RoomService.getAvailableRoomsForHotelAndDate(
                hotelId,
                checkDate,
            );
        }

        return Response.json(rooms, { status: 200 });
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
