import { deleteRoomById, getRoomById, updateRoomById } from "@services/room.service";

export async function GET(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const room = await getRoomById(id);

        return Response.json(room, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function PUT(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const body = await request.json();

        const room = await updateRoomById(id, body);

        return Response.json(room, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function DELETE(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;

        const room = await deleteRoomById(id);

        return Response.json(room, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
