import { IUser } from "../../../../services/user.service";
import { AuthService } from "../../../../services/auth.service";

export async function POST(request: Request) {
    try {
        const data = (await request.json()) as IUser;
        const user = await AuthService.register(data);
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
