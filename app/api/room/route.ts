import { createRoom } from "@services/room.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const room = await createRoom(body);
        return Response.json(room, { status: 201 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
