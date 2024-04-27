import { login } from "@services/auth.service";

export const revalidate = 0;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const user = await login({ email, password });

        return Response.json(user, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
