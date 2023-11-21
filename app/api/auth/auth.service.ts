import { ILogin, IUser } from "../../store/auth.store";

export class AuthService {
    static users: IUser[] = [
        {
            email: "test@test.com",
            password: "test",
            name: "Test User",
            avatar: "https://i.pravatar.cc/300",
            id: "1",
        },
    ];

    static async login({ email, password }: ILogin): Promise<{ user: IUser }> {
        return new Promise((resolve, reject) => {
            const user = AuthService.users.find(
                (u) => u.email === email && u.password === password,
            );

            if (user) {
                resolve({ user });
            } else {
                reject({ message: "Credenciales invalidas" });
            }
        });
    }
}
