import { IUser } from "@/app/api/user/user.service";
import Input from "@/app/components/input/Input";
import { FC } from "react";

interface IProps {
    user: IUser | null;
}

const UserInfo: FC<IProps> = ({ user }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-5 w-full">
                <div className="col-span-2">
                    <Input label="Nombre completo" readOnly value={user?.name ?? ""} />
                </div>
                <div className="col-span-1">
                    <Input label="Email" readOnly value={user?.email ?? ""} />
                </div>
                <div className="col-span-1">
                    <Input
                        label="Documento"
                        readOnly
                        value={`${user?.documentType ?? "-"} - ${user?.documentNumber ?? "-"}`}
                    />
                </div>
                <div className="col-span-1">
                    <Input label="Telefono" readOnly value={user?.cellphone ?? ""} />
                </div>
                <div className="col-span-1">
                    <Input label="Genero" readOnly value={user?.gender ?? ""} />
                </div>
            </div>
        </>
    );
};

export default UserInfo;
