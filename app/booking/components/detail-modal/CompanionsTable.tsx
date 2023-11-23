import { IUser } from "@/app/api/auth/auth.service";
import { FC } from "react";

interface IProps {
    companions: IUser[];
}

const CompanionsTable: FC<IProps> = ({ companions }) => {
    return (
        <table className="min-w-full text-sm font-light text-center">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className="px-6 py-4">
                        #
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Documentación
                    </th>
                </tr>
            </thead>
            <tbody>
                {companions.length == 0 && (
                    <tr className="border-b dark:border-neutral-500 text-center bg-gray-500/20" aria-colspan={5}>
                        <td
                            colSpan={5}
                            className="whitespace-nowrap px-6 py-4 font-bold text-3xl md:text-5xl text-black/50"
                        >
                            No hay reservas
                        </td>
                    </tr>
                )}
                {companions.map((companion, index) => (
                    <tr className="border-b dark:border-neutral-500" key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4">{companion.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{companion.email}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                            {`${companion.documentType} - ${companion.documentNumber}`}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CompanionsTable;
