import { ILogin, IUser, Role } from "@/types";
import { UserService } from "./user.service";
import { validatePassword } from "@/helpers/util";

export class AuthService {
    static async login({ email, password }: ILogin): Promise<{ user: IUser }> {
        return new Promise(async (resolve, reject) => {
            if (!email) {
                return reject({ message: "Email requerido" });
            }

            if (!password) {
                return reject({ message: "Contraseña requerida" });
            }

            const user = await UserService.findByEmail(email);

            const isPasswordValid = await validatePassword(password, user.password);

            if (!isPasswordValid) {
                return reject({ message: "Contraseña incorrecta" });
            }

            resolve({ user });
        });
    }

    static async register(userDto: IUser): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            const newUser: IUser = {
                ...userDto,
                avatar: `https://robohash.org/${userDto.name}`,
                role: Role.User,
            };

            await UserService.create(newUser).catch(reject);

            resolve(newUser);
        });
    }
}
