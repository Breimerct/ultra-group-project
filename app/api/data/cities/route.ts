import CommonService from "@services/common.service";

export async function GET() {
    const cities = await CommonService.getCities();

    return Response.json(cities, { status: 200 });
}
