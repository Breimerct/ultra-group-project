import Link from "next/link";
import { FC } from "react";
import HideComponent from "../hide-components/HideComponent";

interface IProps {
    className?: string;
}

const Header: FC<IProps> = ({ className }) => {
    const classes = className ?? "w-full bg-zinc-100";

    return (
        <header className={classes}>
            <nav className="flex justify-end items-center py-2 px-4">
                <ul className="flex justify-center items-center gap-1">
                    <li className="mx-2 px-3 py-1">
                        <Link
                            href="/"
                            className="hover:text-emerald-500 transition-all text-current"
                        >
                            Inicio
                        </Link>
                    </li>
                    <HideComponent invert>
                        <li className="mx-2 px-3 py-1">
                            <Link
                                href="/auth/login"
                                className="hover:text-emerald-500 transition-all text-current"
                            >
                                Iniciar sesión
                            </Link>
                        </li>
                        <li className="mx-2 px-3 py-1">
                            <Link
                                href="/auth/register"
                                className="hover:text-emerald-500 transition-all text-current"
                            >
                                Registrarse
                            </Link>
                        </li>
                    </HideComponent>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
