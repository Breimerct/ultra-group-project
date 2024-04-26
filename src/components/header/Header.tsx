import Link from "next/link";
import { FC } from "react";
import HideComponent from "../hide-components/HideComponent";
import UserOptions from "../user-options/UserOptions";

interface IProps {
    className?: string;
}

const Header: FC<IProps> = ({ className }) => {
    const classes = className ?? "w-full bg-zinc-100";

    return (
        <header className={classes}>
            <nav className="flex justify-end items-center py-3 px-5">
                <ul className="flex justify-center items-center gap-2">
                    <li className="hover:bg-emerald-700 hover:text-white px-5 py-2 rounded-md transition-all text-current">
                        <Link href="/" className="w-full h-full">
                            Inicio
                        </Link>
                    </li>
                    <HideComponent invert>
                        <li className="hover:bg-emerald-700 hover:text-white px-5 py-2 rounded-md transition-all text-current">
                            <Link href="/auth/login" className="w-full h-full">
                                Iniciar sesión
                            </Link>
                        </li>
                        <li className="hover:bg-emerald-700 hover:text-white px-5 py-2 rounded-md transition-all text-current">
                            <Link href="/auth/register" className="w-full h-full">
                                Registrarse
                            </Link>
                        </li>
                    </HideComponent>

                    <HideComponent>
                        <UserOptions />
                    </HideComponent>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
