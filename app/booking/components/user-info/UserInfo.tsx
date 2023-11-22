import { IUser } from "@/app/api/auth/auth.service";
import { FC } from "react";

interface IProps {
    user: IUser | null;
}

const UserInfo: FC<IProps> = ({ user }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-10 w-full">
                <div className="col-span-2">
                    <label className="text-black/70">Nombre</label>
                    <p className=" py-2 pl-2 border border-zinc-500/20 text-zinc-600/70 rounded-md">
                        {user?.name ?? "-"}
                    </p>
                </div>
                <div className="col-span-1">
                    <label className="text-black/70">Email</label>
                    <p className=" py-2 pl-2 border border-zinc-500/20 text-zinc-600/70 rounded-md">
                        {user?.email ?? "-"}
                    </p>
                </div>
                <div className="col-span-1">
                    <label className="text-black/70">Documentación</label>
                    <p className=" py-2 pl-2 border border-zinc-500/20 text-zinc-600/70 rounded-md">
                        {`${user?.documentType ?? "-"} ${
                            user?.documentNumber ?? "-"
                        }`}
                    </p>
                </div>
                <div className="col-span-1">
                    <label className="text-black/70">Telefono</label>
                    <p className=" py-2 pl-2 border border-zinc-500/20 text-zinc-600/70 rounded-md">
                        {user?.cellphone ?? "-"}
                    </p>
                </div>
                <div className="col-span-1">
                    <label className="text-black/70">Genero</label>
                    <p className=" py-2 pl-2 border border-zinc-500/20 text-zinc-600/70 rounded-md">
                        {user?.gender ?? "-"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
