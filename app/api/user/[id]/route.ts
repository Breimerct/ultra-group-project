import { UserService } from "../../../../services/user.service";

export async function PUT(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const body = await request.json();

        const user = await UserService.update(id, body);
        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}

export async function PATCH(request: Request, response: { params: { id: string } }) {
    try {
        const { id } = response.params;
        const body = await request.json();

        if (!body.currentPassword || !body.newPassword) {
            throw new Error("Faltan campos requeridos");
        }

        const user = await UserService.updatePassword(
            id,
            body.currentPassword,
            body.newPassword,
        );
        return Response.json(user, { status: 200 });
    } catch (error: any) {
        const message =
            error instanceof Error || error instanceof Object ? error.message : error;
        const status = error instanceof Error || error instanceof Object ? 500 : 400;

        return Response.json({ message }, { status });
    }
}
