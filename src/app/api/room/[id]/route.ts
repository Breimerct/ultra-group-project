import { deleteRoomById, getRoomById, updateRoomById } from "@services/room.service";

export const revalidate = 0;

export async function GET(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const room = await getRoomById(id);

        return Response.json(room, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function PUT(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const body = await request.json();

        const room = await updateRoomById(id, body);

        return Response.json(room, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}

export async function DELETE(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;

        const room = await deleteRoomById(id);

        return Response.json(room, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
