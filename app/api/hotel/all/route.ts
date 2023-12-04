import { HotelService } from "../hotel.service";

export async function GET() {
    const hotels = await HotelService.getHotels();
    return Response.json(hotels, { status: 200 });
}
