import { AuthService } from "../auth.service";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const { user } = await AuthService.login({ email, password });

        return Response.json({ user }, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 401 });
    }
}
