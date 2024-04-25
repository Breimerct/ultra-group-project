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
        return new Promise(async (resolve, reject) => {
            try {
                const user = await userModel.findById(id).lean<IUser>();

                if (!user) {
                    reject({ message: "Usuario no encontrado" });
                    return;
                }

                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async findByEmail(email: string): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const loweCaseEmail = email.toLowerCase();
                const user = await userModel
                    .findOne({ email: loweCaseEmail })
                    .lean<IUser>();

                if (!user) {
                    return reject({
                        message: `Usuario con email ${email} no encontrado.`,
                    });
                }

                return resolve(user);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async getAll(): Promise<IUser[]> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                const users = await userModel.find();

                return resolve(users);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static create(user: IUser): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
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

                const newUser = await userModel.create(lowerCaseUser);

                resolve(newUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    static update(id: string, user: IUser): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                validateMongoId(id);

                const userFound = (await userModel
                    .findById(id)
                    .lean()
                    .catch(reject)) as IUser;

                if (!userFound) {
                    return reject({ message: "Usuario no encontrado" });
                }

                const lowerCaseUser = lowerCaseObject<IUser>(user);

                if (lowerCaseUser.email && lowerCaseUser.email !== userFound.email) {
                    const existingUser = await userModel.findOne({
                        email: lowerCaseUser.email,
                    });

                    if (existingUser) {
                        return reject({
                            message: `Usuario con email ${lowerCaseUser.email}, ya existe.`,
                        });
                    }
                }

                const newData = {
                    ...userFound,
                    ...lowerCaseUser,
                    avatar: `https://robohash.org/${
                        lowerCaseUser?.name ?? userFound.name
                    }`,
                };

                const updateUser = await userModel.findByIdAndUpdate(id, newData, {
                    new: true,
                });

                return resolve(updateUser);
            } catch (error) {
                return reject(error);
            }
        });
    }

    static updatePassword(
        id: string,
        currentPassword: string,
        newPassword: string,
    ): Promise<IUser> {
        connectDB();
        return new Promise(async (resolve, reject) => {
            try {
                validateMongoId(id);

                if (!currentPassword) {
                    return reject({ message: "Contraseña actual es requerida" });
                }

                if (!newPassword) {
                    return reject({ message: "Contraseña nueva es requerida" });
                }

                const user = await userModel.findById(id);

                if (!user) {
                    return reject({ message: "Usuario no encontrado" });
                }

                const isPasswordValid = await validatePassword(
                    currentPassword,
                    user.password,
                );

                if (!isPasswordValid) {
                    return reject({ message: "Contraseña actual incorrecta" });
                }

                const isValidPassword = await validatePassword(
                    newPassword,
                    user.password,
                );

                if (isValidPassword) {
                    return reject({
                        message: "La nueva contraseña debe ser diferente a la actual",
                    });
                }

                const hashedPassword = await hashPassword(newPassword);
                user.password = hashedPassword;

                const updatedUser = await userModel.findByIdAndUpdate(id, user, {
                    new: true,
                });

                return resolve(updatedUser);
            } catch (error) {
                return reject(error);
            }
        });
    }
}
