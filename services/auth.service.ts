import { ILogin, IUser, Role } from "@/types";
import { createUser, findUserByEmail } from "./user.service";
import { validatePassword } from "@/helpers/util";

export async function login({ email, password }: ILogin): Promise<IUser> {
    if (!email) {
        throw new Error("Email requerido");
    }

    if (!password) {
        throw new Error("Contraseña requerida");
    }

    const user = await findUserByEmail(email);

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Contraseña incorrecta");
    }

    return user;
}

export async function register(userDto: IUser): Promise<IUser> {
    const newUser: IUser = {
        ...userDto,
        avatar: `https://robohash.org/${userDto.name}`,
        role: Role.User,
    };

    const newUserResult = await createUser(newUser);

    return newUserResult;
}
