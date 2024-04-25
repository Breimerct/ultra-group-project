import { getHotels } from "@services/hotel.service";

export async function GET() {
    const hotels = await getHotels();
    return Response.json(hotels, { status: 200 });
}
