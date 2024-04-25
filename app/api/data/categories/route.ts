import { getCategories } from "@services/common.service";

export async function GET() {
    const categories = await getCategories();

    return Response.json(categories, { status: 200 });
}
