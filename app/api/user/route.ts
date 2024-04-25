import { getAllUser } from "@services/user.service";

export async function GET() {
    const users = await getAllUser();
    return Response.json(users, { status: 200 });
}
