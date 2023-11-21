import Link from "next/link";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import SearchDestinationForm from "./components/search-destination/SearchDestinationForm";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <section
                className="flex flex-1 min-w-full rounded-xl relative overflow-hidden bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: "url('/background-section.webp')",
                }}
            >
                <header className="absolute z-20 top-0 left-0 w-full">
                    <nav className="flex justify-between items-center py-2 px-4">
                        <figure>
                            <img
                                src="/vercel.svg"
                                alt="Ultra Group"
                                className="w-40 mx-auto"
                            />
                        </figure>

                        <ul className="flex justify-center items-center gap-1">
                            <li className="mx-2 px-3 py-1">
                                <Link
                                    href="#"
                                    className="text-white hover:text-emerald-500 transition-all"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li className="mx-2 px-3 py-1">
                                <Link
                                    href="auth/login"
                                    className="text-white hover:text-emerald-500 transition-all"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li className="mx-2 px-3 py-1">
                                <Link
                                    href="auth/register"
                                    className="text-white hover:text-emerald-500 transition-all"
                                >
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <article className="relative z-10 min-h-full flex flex-col flex-1 mx-auto">
                    <div className="h-full mx-auto flex flex-col items-center justify-center flex-1">
                        <h1 className="text-white font-bold  mb-3 text-5xl text-center">
                            No lo llames sueño. Llámalo un plan
                        </h1>
                        <p className="text-white text-xl text-center max-w-lg self-center">
                            Viaja como quieras con{" "}
                            <span className="text-emerald-500 font-medium">
                                Ultra Group
                            </span>
                            , que te ayuda a descubrir, vivir y viajar a tu
                            propio ritmo.
                        </p>
                    </div>

                    <article className="mb-48 w-full">
                        <div className="bg-white rounded-md max-w-[70%] xl:max-w-[50%] mx-auto p-4">
                            <SearchDestinationForm />
                        </div>
                    </article>
                </article>
            </section>
        </main>
    );
}
