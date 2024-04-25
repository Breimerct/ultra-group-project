import { login } from "@services/auth.service";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const { user } = await login({ email, password });

        return Response.json(user, { status: 200 });
    } catch (error) {
        return Response.json(error, { status: 401 });
    }
}
