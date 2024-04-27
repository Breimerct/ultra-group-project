import { getCategories } from "@services/common.service";

export const revalidate = 0;

export async function GET() {
    try {
        const categories = await getCategories();

        return Response.json(categories, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
