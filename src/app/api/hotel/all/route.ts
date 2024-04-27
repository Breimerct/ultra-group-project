import { getHotels } from "@services/hotel.service";

export const revalidate = 0;

export async function GET() {
    try {
        const hotels = await getHotels();

        return Response.json(hotels, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
