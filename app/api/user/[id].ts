import { UserService } from "./user.service";

export async function PUT(request: Request, params: { id: string }) {
    try {
        const { id } = params;
        const body = await request.json();

        const user = await UserService.update(id, body);
        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message = error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
