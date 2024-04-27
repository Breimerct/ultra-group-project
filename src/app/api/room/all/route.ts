import { getRooms } from "@services/room.service";

export const revalidate = 0;

export async function GET() {
    try {
        const rooms = await getRooms();
        return Response.json(rooms, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
