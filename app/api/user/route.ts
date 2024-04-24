import { UserService } from "@services/user.service";

export async function GET() {
    const users = await UserService.getAll();
    return Response.json(users, { status: 200 });
}
