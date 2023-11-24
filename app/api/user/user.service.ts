export interface IUser {
    id?: string;
    name: string;
    email: string;
    cellphone: string;
    avatar?: string;
    password?: string;
    role?: string;
    gender?: Gender | string | null;
    documentType?: string;
    documentNumber?: string;
}

export enum Gender {
    Female = "Femenino",
    Male = "Masculino",
}

export class UserService {
    static users: IUser[] = [
        {
            email: "admin@admin.ad",
            password: "admin",
            name: "Admin User",
            cellphone: "1234567890",
            avatar: "https://robohash.org/admin",
            id: "1",
            role: "admin",
            documentNumber: "1234567890",
            documentType: "CC",
            gender: Gender.Male,
        },
    ];

    static async findOne(id: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const user = UserService.users.find((u) => u.id === id);

            if (!user) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            resolve(user);
        });
    }
}
