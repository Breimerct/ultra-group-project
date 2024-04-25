import * as bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
interface IHtmlTemplate {
    name: string;
    checkIn: string;
    checkOut: string;
}

export const generateTemplate = ({ name, checkIn, checkOut }: IHtmlTemplate) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Reserva</h1>
            </div>
            <div class="content">
              <p>¡Hola ${name}!</p>
              <p>Has realizado una nueva reserva con las siguientes fechas:</p>
              <p>Fecha de Check-in: ${checkIn}</p>
              <p>Fecha de Check-out: ${checkOut}</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export const hashPassword = async (password: string | undefined) => {
    if (!password) {
        throw new Error("password required");
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
};

export const validatePassword = async (password: string, hashPassword: string) => {
    if (!password) {
        throw new Error("password required");
    }

    if (!hashPassword) {
        throw new Error("hashPassword required");
    }

    return await bcrypt.compare(password, hashPassword);
};

export const validateMongoId = (id: string) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject({ message: "ID required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            reject({ message: "Invalid ID" });
            return;
        }

        resolve(true);
    });
};

export const lowerCaseObject = <T>(object: T | any): T => {
    const lowerCaseUserDto: T | any = {};

    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];

            if (key === "password") {
                lowerCaseUserDto[key] = value;
            } else if (typeof value === "string") {
                lowerCaseUserDto[key] = value.toLowerCase();
            } else {
                lowerCaseUserDto[key] = value;
            }
        }
    }

    return lowerCaseUserDto;
};

export const getAvatarUrl = (fullName: string) => {
    return `https://ui-avatars.com/api/?name=${fullName}&background=random&bold=true&uppercase=true`;
};
