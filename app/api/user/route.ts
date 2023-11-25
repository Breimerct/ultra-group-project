import { UserService } from "./user.service";

export function GET() {
    const users = UserService.users;
    return Response.json(users, { status: 200 });
}
