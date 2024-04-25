import { getCities } from "@services/common.service";

export async function GET() {
    const cities = await getCities();

    return Response.json(cities, { status: 200 });
}
