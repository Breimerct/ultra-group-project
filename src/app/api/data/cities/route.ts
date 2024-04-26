import { getCities } from "@services/common.service";

export async function GET() {
    try {
        const cities = await getCities();

        return Response.json(cities, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}