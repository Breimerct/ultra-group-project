import CITIES from "../cities";

export function GET() {
    return Response.json(CITIES, { status: 200 });
}
