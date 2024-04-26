import { getAllUser } from "@services/user.service";

export async function GET() {
    try {
        const users = await getAllUser();
        return Response.json(users, { status: 200 });
    } catch (error: Error | any) {
        const { message } = error;

        console.log("ERROR MESSAGE LOG: ", message);
        return Response.json({ message: message }, { status: 400 });
    }
}
