import { IUser, UserService } from "../user/user.service";

export interface ILogin {
    email: string;
    password: string;
}

export class AuthService {
    static async login({ email, password }: ILogin): Promise<{ user: IUser }> {
        return new Promise((resolve, reject) => {
            const user = UserService.users.find((u) => u.email === email && u.password === password);

            if (!user) {
                reject({ message: "Credenciales invalidas" });
                return;
            }

            resolve({ user });
        });
    }

    static async register(userDto: IUser): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const { email } = userDto;
            const user = UserService.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

            if (user) {
                reject({ message: "Usuario ya existe" });
                return;
            }

            const newUser: IUser = {
                ...userDto,
                avatar: `https://robohash.org/${userDto.name}`,
                id: crypto.randomUUID(),
                role: "user",
            };

            UserService.users.unshift(newUser);

            resolve(newUser);
        });
    }
}
