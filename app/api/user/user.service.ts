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
        {
            email: "breimerct@gmail.com",
            password: "user",
            name: "Breimer Correa",
            cellphone: "1234567890",
            avatar: "https://robohash.org/breimerct",
            id: "2",
            role: "user",
            documentNumber: "1234567890",
            documentType: "CC",
            gender: Gender.Male,
        },
    ];

    static async findOne(id: string): Promise<IUser> {
        console.log("findOne", id);
        return new Promise((resolve, reject) => {
            const user = this.users.find((u) => u.id === id);

            if (!user) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            resolve(user);
        });
    }

    static async findByEmail(email: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const user = this.users.find((u) => u.email === email);

            if (!user) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            resolve(user);
        });
    }

    static async getAll(): Promise<IUser[]> {
        return new Promise((resolve) => {
            resolve(this.users);
        });
    }

    static create(user: IUser): Promise<IUser> {
        console.log("create", user);
        return new Promise((resolve) => {
            this.users.push(user);

            resolve(user);
        });
    }

    static update(id: string, user: IUser): Promise<IUser> {
        // console.log(id, user);
        return new Promise((resolve, reject) => {
            const userFound = this.users.find((u) => u.id === id);

            if (!userFound) {
                reject({ message: "Usuario no encontrado" });
                return;
            }

            const userIndex = this.users.findIndex((u) => u.id === id);

            this.users[userIndex] = {
                ...userFound,
                ...user,
            };

            resolve(this.users[userIndex]);
        });
    }
}
