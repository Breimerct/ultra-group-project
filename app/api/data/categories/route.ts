import CommonService from "../common.service";

export async function GET() {
    const categories = await CommonService.getCategories();

    return Response.json(categories, { status: 200 });
}
