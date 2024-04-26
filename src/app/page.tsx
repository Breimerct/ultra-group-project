import SearchDestinationForm from "@components/search-destination/SearchDestinationForm";
import Header from "@/components/header/Header";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <section
                className="flex flex-col flex-1 min-w-full rounded-xl relative overflow-hidden bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: "url('/background-section.webp')",
                }}
            >
                <Header className="w-full bg-transparent text-white" />

                <article className="relative z-10 min-h-full flex flex-col flex-1 mx-auto">
                    <div className="h-full mx-auto flex flex-col items-center justify-center flex-1">
                        <h1 className="text-white font-bold  mb-3 text-5xl text-center">
                            No lo llames sueño. Llámalo un plan
                        </h1>
                        <p className="text-white text-xl text-center max-w-lg self-center">
                            Viaja como quieras con{" "}
                            <span className="text-emerald-500 font-medium">Ultra Group</span>,
                            que te ayuda a descubrir, vivir y viajar a tu propio ritmo.
                        </p>
                    </div>

                    <article className="mb-48 w-full p-4">
                        <div className="bg-white w-full rounded-md mx-auto p-4">
                            <SearchDestinationForm />
                        </div>
                    </article>
                </article>
            </section>
        </main>
    );
}
