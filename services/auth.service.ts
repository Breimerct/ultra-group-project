import { ILogin, IUser, Role } from "@/types";
import { createUser, findUserByEmail } from "./user.service";
import { validatePassword } from "@/helpers/util";

export async function login({ email, password }: ILogin): Promise<{ user: IUser }> {
    return new Promise(async (resolve, reject) => {
        if (!email) {
            return reject({ message: "Email requerido" });
        }

        if (!password) {
            return reject({ message: "Contraseña requerida" });
        }

        const user = await findUserByEmail(email);

        const isPasswordValid = await validatePassword(password, user.password);

        if (!isPasswordValid) {
            return reject({ message: "Contraseña incorrecta" });
        }

        resolve({ user });
    });
}

export async function register(userDto: IUser): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser: IUser = {
                ...userDto,
                avatar: `https://robohash.org/${userDto.name}`,
                role: Role.User,
            };

            console.log("userDto", newUser);

            const newUserResult = await createUser(newUser);

            return resolve(newUserResult);
        } catch (error) {
            return reject(error);
        }
    });
}
