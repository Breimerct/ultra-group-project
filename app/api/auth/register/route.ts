import { IUser } from "@/types";
import { register } from "@services/auth.service";

export async function POST(request: Request) {
    try {
        const data = (await request.json()) as IUser;
        const user = await register(data);
        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object
                ? error["message"] ?? "-"
                : "Error desconocido";
        const status = error instanceof Error || error instanceof Object ? 400 : 500;

        return Response.json({ message }, { status });
    }
}
