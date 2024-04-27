import {
    hashPassword,
    lowerCaseObject,
    validateMongoId,
    validatePassword,
} from "@/helpers/util";
import userModel from "@/models/user.model";
import { IUser } from "@/types";

export async function findOneUser(id: string): Promise<IUser> {
    validateMongoId(id);

    const user = await userModel.findById(id).lean<IUser>();

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return user;
}

export async function findUserByEmail(email: string): Promise<IUser> {
    const loweCaseEmail = email.toLowerCase();
    const user = await userModel.findOne({ email: loweCaseEmail }).lean<IUser>();

    if (!user) {
        throw new Error(`Usuario con email ${email} no encontrado.`);
    }

    return user;
}

export async function getAllUser(): Promise<IUser[]> {
    const users = await userModel.find();

    return users;
}

export async function createUser(user: IUser): Promise<IUser> {
    const lowerCaseUser = lowerCaseObject<IUser>(user);

    const existingUser = await userModel.findOne({
        email: lowerCaseUser.email,
    });

    if (existingUser) {
        throw new Error(`Usuario con email ${lowerCaseUser.email}, ya existe.`);
    }

    const hashedPassword = await hashPassword(lowerCaseUser.password);
    lowerCaseUser.password = hashedPassword;

    const newUser = await userModel.create(lowerCaseUser);

    return newUser;
}

export async function updateUser(id: string, user: IUser): Promise<IUser> {
    validateMongoId(id);
    const userFound = await userModel.findById(id).lean<IUser>();

    if (!userFound) {
        throw new Error("Usuario no encontrado");
    }

    const lowerCaseUser = lowerCaseObject<IUser>(user);

    if (lowerCaseUser.email && lowerCaseUser.email !== userFound.email) {
        const existingUser = await userModel.findOne({
            email: lowerCaseUser.email,
        });

        if (existingUser) {
            throw new Error(`Usuario con email ${lowerCaseUser.email}, ya existe.`);
        }
    }

    const newData = {
        ...userFound,
        ...lowerCaseUser,
        avatar: `https://robohash.org/${lowerCaseUser?.name ?? userFound.name}`,
    };

    const updateUser = await userModel.findByIdAndUpdate(id, newData, {
        new: true,
    });

    return updateUser;
}

export async function updatePasswordUser(
    id: string,
    currentPassword: string,
    newPassword: string,
): Promise<IUser> {
    validateMongoId(id);

    if (!currentPassword) {
        throw new Error("Contraseña actual es requerida");
    }

    if (!newPassword) {
        throw new Error("Contraseña nueva es requerida");
    }

    const user = await userModel.findById(id);

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await validatePassword(currentPassword, user.password);

    if (!isPasswordValid) {
        throw new Error("Contraseña actual incorrecta");
    }

    const isValidPassword = await validatePassword(newPassword, user.password);

    if (isValidPassword) {
        throw new Error("La nueva contraseña debe ser diferente a la actual");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    const updatedUser = await userModel.findByIdAndUpdate(id, user, {
        new: true,
    });

    return updatedUser;
}
