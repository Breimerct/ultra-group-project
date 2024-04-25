import {
    hashPassword,
    lowerCaseObject,
    validateMongoId,
    validatePassword,
} from "@/helpers/util";
import connectDB from "@/lib/mongo";
import userModel from "@/models/user.model";
import { IUser } from "@/types";

export class UserService {
    static async findOne(id: string): Promise<IUser> {
        connectDB();
        return new Promise((resolve, reject) => {
            const user = userModel.findById(id);

            if (!user) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            resolve(user);
        });
    }

    static async findByEmail(email: string): Promise<IUser> {
        connectDB();
        return new Promise((resolve, reject) => {
            const loweCaseEmail = email.toLowerCase();
            const user = userModel.findOne({ email: loweCaseEmail }).catch(reject);

            if (!user) {
                return reject({
                    message: `Usuario con email ${email} no encontrado.`,
                });
            }

            resolve(user);
        });
    }

    static async getAll(): Promise<IUser[]> {
        connectDB();
        return new Promise((resolve) => {
            const users = userModel.find();

            resolve(users);
        });
    }

    static create(user: IUser): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            const lowerCaseUser = lowerCaseObject<IUser>(user);

            const existingUser = await userModel.findOne({
                email: lowerCaseUser.email,
            });

            if (existingUser) {
                reject({
                    message: `Usuario con email ${lowerCaseUser.email}, ya existe.`,
                });
            }

            const hashedPassword = await hashPassword(lowerCaseUser.password);
            lowerCaseUser.password = hashedPassword;

            const newUser = await userModel.create(lowerCaseUser).catch(reject);

            resolve(newUser);
        });
    }

    static update(id: string, user: IUser): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            validateMongoId(id).catch(reject);

            const userFound = (await userModel
                .findById(id)
                .lean()
                .catch(reject)) as IUser;

            if (!userFound) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            console.log(userFound);

            const newData = {
                ...userFound,
                ...user,
                avatar: `https://robohash.org/${user?.name ?? userFound.name}`,
            };

            const updateUser = await userModel
                .findByIdAndUpdate(id, newData, { new: true })
                .catch(reject);

            resolve(updateUser);
        });
    }

    static updatePassword(
        id: string,
        currentPassword: string,
        newPassword: string,
    ): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            validateMongoId(id).catch(reject);

            if (!currentPassword) {
                reject({ message: "Contraseña actual es requerida" });
            }

            if (!newPassword) {
                reject({ message: "Contraseña nueva es requerida" });
            }

            const user = await userModel.findById(id).catch(reject);

            if (!user) {
                reject({ message: "Usuario no encontrado" });
            }

            const isPasswordValid = await validatePassword(
                currentPassword,
                user.password,
            );

            if (!isPasswordValid) {
                reject({ message: "Contraseña actual incorrecta" });
            }

            const isValidPassword = await validatePassword(newPassword, user.password);

            if (isValidPassword) {
                reject({ message: "La nueva contraseña debe ser diferente a la actual" });
            }

            const hashedPassword = await hashPassword(newPassword);
            user.password = hashedPassword;

            const updatedUser = await userModel.findByIdAndUpdate(id, user, {
                new: true,
            });

            resolve(updatedUser);
        });
    }
}
