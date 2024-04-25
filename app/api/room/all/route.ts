import { getRooms } from "@services/room.service";

export async function GET() {
    const rooms = await getRooms();
    return Response.json(rooms, { status: 200 });
}
