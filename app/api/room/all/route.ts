import { RoomService } from "@services/room.service";

export async function GET() {
    const rooms = await RoomService.getRooms();
    return Response.json(rooms, { status: 200 });
}
