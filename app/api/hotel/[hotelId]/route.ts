import { HotelService } from "../hotel.service";

export async function GET(
    request: Request,
    response: { params: { hotelId: string } },
) {
    try {
        const { hotelId } = response.params;

        const hotel = await HotelService.getHotelById(hotelId);

        return Response.json(hotel, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 401 });
    }
}
