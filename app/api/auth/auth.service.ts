export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    id?: string;
    name: string;
    email: string;
    cellphone: string;
    avatar?: string;
    password?: string;
    role?: string;
    gender?: Gender;
    documentType?: string;
    documentNumber?: string;
}

export enum Gender {
    Female = "female",
    Male = "Male",
}

export class AuthService {
    static users: IUser[] = [
        {
            email: "admin@admin.ad",
            password: "admin",
            name: "Admin User",
            cellphone: "1234567890",
            avatar: "https://i.pravatar.cc/300",
            id: "1",
            role: "admin",
            documentNumber: "1234567890",
            documentType: "dni",
            gender: Gender.Male,
        },
    ];

    static async login({ email, password }: ILogin): Promise<{ user: IUser }> {
        return new Promise((resolve, reject) => {
            const user = AuthService.users.find(
                (u) => u.email === email && u.password === password,
            );

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
            const user = AuthService.users.find(
                (u) => u.email.toLowerCase() === email.toLowerCase(),
            );

            if (user) {
                reject({ message: "Usuario ya existe" });
                return;
            }

            const newUser: IUser = {
                ...userDto,
                avatar: "https://i.pravatar.cc/300",
                id: crypto.randomUUID(),
                role: "user",
            };

            AuthService.users.unshift(newUser);

            resolve(newUser);
        });
    }
}
