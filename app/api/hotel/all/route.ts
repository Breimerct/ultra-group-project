import { HotelService } from "../../../../services/hotel.service";

export async function GET() {
    const hotels = await HotelService.getHotels();
    return Response.json(hotels, { status: 200 });
}
