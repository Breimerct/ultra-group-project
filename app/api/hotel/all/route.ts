import { HotelService } from "../hotel.service";

export function GET() {
    return Response.json(HotelService.hotels, { status: 200 });
}
