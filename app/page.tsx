import { SearchIcon } from "./components/Icons";
import Autocomplete from "./components/autocomplete/Autocomplete";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

export default function Home() {
    return (
        <ProtectedRoute>
            <main className="flex min-h-screen flex-col items-center justify-between p-5">
                <section
                    className="flex flex-1 min-w-full rounded-xl relative overflow-hidden bg-no-repeat bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/background-section.webp')",
                    }}
                >
                    <article className="relative z-10 min-h-full flex flex-col flex-1 mx-auto">
                        <div className="h-full mx-auto grid place-content-center flex-1">
                            <h1 className="text-white font-bold text-5xl text-center">
                                No lo llames sueño. Llámalo un plan
                            </h1>
                            <p className="text-white font-mono text-center">
                                Viaja como quieras con Phnes Travels, que te
                                ayuda a descubrir, vivir y viajar a tu propio
                                ritmo.
                            </p>
                        </div>

                        <article className="mb-32 w-full">
                            <Autocomplete items={["item 1", "item 2"]} />
                            <div className="bg-white rounded-md max-w-[70%] mx-auto p-4">
                                <form className="w-full flex items-center gap-3">
                                    <div className="w-full">
                                        <label className="text-sm font-medium text-emerald-900">
                                            Destino
                                        </label>
                                        <input
                                            type="text"
                                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label>date</label>
                                        <input
                                            type="date"
                                            className="outline-none rounded-md border-2 border-solid border-zinc-400 p-2 w-full"
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button className="rounded-md px-5 py-2 bg-emerald-700 flex flex-nowrap items-center gap-3 font-medium text-white hover:bg-emerald-800 hover:shadow-sm hover:shadow-emerald-950/70 transition-all">
                                            <span>Buscar</span>
                                            <SearchIcon />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </article>
                </section>
            </main>
        </ProtectedRoute>
    );
}
