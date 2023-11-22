import { RoomService } from "../room.service";

export async function GET(
    request: Request,
    response: { params: { id: string } },
) {
    try {
        const { id } = response.params;
        const room = await RoomService.getRoomById(id);

        return Response.json(room, { status: 200 });
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
