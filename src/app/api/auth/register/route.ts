import { IUser } from "@/types";
import { register } from "@services/auth.service";

export const revalidate = 0;

export async function POST(request: Request) {
    try {
        const data = (await request.json()) as IUser;
        const user = await register(data);

        return Response.json(user, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
